# -*- coding: utf-8 -*-
# CREATED ON DATE: 12.05.2016
__author__ = 'mail@pythonic.ninja'

from mosaico.models import Mosaico
from rest_framework.serializers import ModelSerializer


class MosaicoSerializer(ModelSerializer):
    class Meta:
        model = Mosaico
