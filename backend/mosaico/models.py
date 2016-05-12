from __future__ import unicode_literals

import datetime

import os

from django.conf import settings
from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.utils.translation import ugettext_lazy as _


def get_mosaico_result_image_path(instance, filename):
    now = datetime.datetime.now()
    return os.path.join('mosaico', str(now.year), str(now.month), str(now.day), filename)


class Mosaico(TimeStampedModel):
    INITIAL = 0
    RENDERING = 1
    FINISHED = 2
    ERROR = 10
    CANCELED = 11
    status_choices = (
        (INITIAL, _('Initial')),
        (RENDERING, _('Rendering')),
        (FINISHED, _('Finished')),
        (ERROR, _('Error')),
        (CANCELED, _('Canceled')),
    )

    name = models.CharField(verbose_name=_('Name'), max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    images_folder = models.ForeignKey('images.ImageFolder')
    target = models.ImageField(verbose_name=_('Target image'), upload_to='target/%Y/%m/%d')
    status = models.PositiveSmallIntegerField(verbose_name=_('Status'), choices=status_choices, default=INITIAL)
    result_image = models.ImageField(verbose_name=_('Out file'), upload_to=get_mosaico_result_image_path, blank=True,
                                     null=True)

    def __unicode__(self):
        return u"{0}@{1} {2}".format(self.name, self.user, self.get_status_display())

    def images(self):
        images = []
        for image in self.images_folder.images.all():
            images.append(image.image.path)
        return images
