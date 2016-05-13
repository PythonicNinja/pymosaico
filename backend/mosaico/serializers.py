# -*- coding: utf-8 -*-
# CREATED ON DATE: 12.05.2016
from rest_framework.fields import HiddenField, CurrentUserDefault

__author__ = 'mail@pythonic.ninja'

from mosaico.models import Mosaico
from rest_framework.serializers import ModelSerializer


class MosaicoSerializer(ModelSerializer):
    class Meta:
        model = Mosaico


class MosaicoCreateSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())

    class Meta:
        model = Mosaico
        fields = ('user', 'images_folder', 'name', 'target')
