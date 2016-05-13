# -*- coding: utf-8 -*-
# CREATED ON DATE: 13.05.2016
import itertools

from osaic import ImageWrapper, lattice, load_raw_tiles, ImageList, extract_average_colors, search_matching_images, \
    Mosaic

__author__ = 'mail@pythonic.ninja'


def mosaicify(target, sources, tiles=32, zoom=1):
    """
    Adapter single core execution so that it can be run as celery task.
    'daemonic processes are not allowed to have children'
    """
    # Load the target image into memory
    mosaic = ImageWrapper(filename=target)

    # Generate the list of rectangles identifying mosaic tiles
    (original_width, original_height) = mosaic.size
    rectangles = list(lattice(original_width, original_height, tiles))

    # Compute the size of the tiles after the zoom factor has been applied
    (zoomed_tile_width, zoomed_tile_height) = (zoom * original_width // tiles,
                                               zoom * original_height // tiles)

    # Initialize the pool of workers
    class pool:
        @classmethod
        def map(cls, func, iterable):
            return map(func, iterable)

    workers = 1
    pool = pool

    # Load tiles into memory and resize them accordingly
    source_tiles = dict(itertools.izip(sources,
                                       load_raw_tiles(sources,
                                                  mosaic.ratio,
                                                  (zoomed_tile_width,
                                                   zoomed_tile_height),
                                                  pool,
                                                  workers)))

    # Indicize all the source images by their average color
    source_list = ImageList(source_tiles.values())

    # Compute the average color of each mosaic tile
    mosaic_avg_colors = list(extract_average_colors(mosaic, rectangles, pool,
                                                    workers))

    # Find which source image best fits each mosaic tile
    best_matching_imgs = list(search_matching_images(source_list,
                                                     mosaic_avg_colors,
                                                     pool, workers))


    # Apply the zoom factor
    (zoomed_width, zoomed_height) = (tiles * zoomed_tile_width,
                                     tiles * zoomed_tile_height)
    mosaic.resize((zoomed_width, zoomed_height))
    rectangles = list(lattice(zoomed_width, zoomed_height, tiles))

    return Mosaic(mosaic, itertools.izip(rectangles,
                                         itertools.imap(source_tiles.get,
                                                        best_matching_imgs)))