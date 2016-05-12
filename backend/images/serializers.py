# -*- coding: utf-8 -*-
# CREATED ON DATE: 12.05.2016
__author__ = 'mail@pythonic.ninja'

from models import ImageFolder
from rest_framework.serializers import ModelSerializer


class ImageFolderSerializer(ModelSerializer):
    class Meta:
        model = ImageFolder
