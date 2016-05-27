# -*- coding: utf-8 -*-
# CREATED ON DATE: 12.05.2016
__author__ = 'mail@pythonic.ninja'

from mosaico.models import Mosaico
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField
from rest_framework.fields import HiddenField, CurrentUserDefault
from easy_thumbnails.files import get_thumbnailer


def get_small_image(obj, field, request=None):
    try:
        options = {'size': (300, 300), 'crop': False}
        url = get_thumbnailer(getattr(obj, field)).get_thumbnail(options).url
        if request:
            url = "/".join(request.build_absolute_uri().split('/')[:3]) + url
            print url
        return url
    except Exception as e:
        return 'https://placeholdit.imgix.net/~text?w=300&h=200'


class MosaicoSerializer(ModelSerializer):
    result_image = SerializerMethodField()
    target = SerializerMethodField()

    class Meta:
        model = Mosaico

    def get_result_image(self, obj):
        return get_small_image(obj, 'result_image', self.context.get('request'))

    def get_target(self, obj):
        return get_small_image(obj, 'target', self.context.get('request'))


class MosaicoCreateSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())

    class Meta:
        model = Mosaico
        fields = ('user', 'images_folder', 'name', 'target')
