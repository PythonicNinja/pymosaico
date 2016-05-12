from __future__ import unicode_literals

from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.utils.translation import ugettext_lazy as _
from django.conf import settings


class Image(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True)
    name = models.CharField(verbose_name=_('Name'), max_length=255)
    image = models.ImageField(verbose_name=_('Image'), upload_to='images/%Y/%m/%d')


class Image2Folder(TimeStampedModel):
    image = models.ForeignKey('Image')
    folder = models.ForeignKey('ImageFolder')
    ordering = models.PositiveSmallIntegerField(verbose_name=_('Ordering'))

    class Meta:
        ordering = ('ordering',)
        unique_together = ('folder', 'ordering')


class ImageFolder(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True)
    name = models.CharField(verbose_name=_('Name'), max_length=255)
    images = models.ManyToManyField('Image', through=Image2Folder, verbose_name=_('Images'))

    def __unicode__(self):
        return u"{0}@{1} #{2}".format(self.name, self.user, self.images.count())
