# -*- coding: utf-8 -*-
# CREATED ON DATE: 12.05.2016
__author__ = 'mail@pythonic.ninja'

from models import ImageFolder, Image
from rest_framework.serializers import ModelSerializer


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image


class ImageFolderSerializer(ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = ImageFolder
