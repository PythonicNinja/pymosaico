from PIL import Image as PILImage
from PIL import ImageOps
from images.models import ImageFolder, Image, Image2Folder
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.utils.six import StringIO


class Command(BaseCommand):
    help = "Command to create initial images"

    def get_colors(self):
        return '''
        red green blue yellow red white black grey
        '''.split()

    def handle(self, *args, **options):
        image_folder, created = ImageFolder.objects.get_or_create(name='colors')

        for i, color in enumerate(self.get_colors()):
            image, created = Image.objects.get_or_create(user=None, name=color)

            size = (5, 5)
            im = PILImage.new("RGB", size, color)
            # im = ImageOps.expand(im, border=5, fill='orange')
            string_io = StringIO()
            try:
                im.save(string_io, format='png')
                content = string_io.getvalue()
                image.image.save(
                    '{0}.png'.format(color),
                    ContentFile(content)
                )
                image.save()

                Image2Folder.objects.get_or_create(
                    folder=image_folder,
                    image=image,
                    ordering=i,
                )
            finally:
                string_io.close()


