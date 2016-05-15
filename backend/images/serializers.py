# -*- coding: utf-8 -*-
# CREATED ON DATE: 12.05.2016
from rest_framework.fields import CurrentUserDefault, HiddenField

__author__ = 'mail@pythonic.ninja'

from models import ImageFolder, Image, Image2Folder
from rest_framework.serializers import ModelSerializer


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image


class ImageFolderSerializer(ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = ImageFolder


class ImageCreateSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())

    class Meta:
        model = Image
        fields = ('user', 'image', 'name')


class ImageFolderCreateSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    images = ImageCreateSerializer(many=True, required=True)

    class Meta:
        model = ImageFolder
        fields = ('user', 'images', 'name')

    def create(self, validated_data):
        images_data = validated_data.pop('images')
        image_folder = ImageFolder.objects.create(**validated_data)
        image_folder.save()
        i = 0
        for image in images_data:
            i += 1
            img_obj = Image.objects.create(name=image['name'], image=image['image'])
            Image2Folder.objects.create(
                folder=image_folder,
                image=img_obj,
                ordering=i,
            )
        return image_folder
