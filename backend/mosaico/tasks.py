
from mosaicify_adapter import mosaicify
from django.core.files.base import ContentFile
from django.utils.six import StringIO

from models import Mosaico
from project.celery import app


__author__ = 'mail@pythonic.ninja'


@app.task
def create_mosaico(mosaico_pk):
    mosaico = Mosaico.objects.get(pk=mosaico_pk)
    mosaico.status = Mosaico.RENDERING
    mosaico.save()

    result = mosaicify(
        target=mosaico.target.path,
        sources=mosaico.images(),
        tiles=128,
        zoom=4,
    )
    result._initialize()
    string_io = StringIO()
    try:
        result._mosaic.blob.save(string_io, format='png')
        content = string_io.getvalue()
        mosaico.result_image.save(
            'result_{0}.png'.format(mosaico.pk),
            ContentFile(content)
        )
        mosaico.status = Mosaico.FINISHED
    finally:
        string_io.close()

    mosaico.save()
