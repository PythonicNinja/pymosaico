# -*- coding: utf-8 -*-
# CREATED ON DATE: 12.05.2016
from django.conf.urls import url

from .views import *

__author__ = 'mail@pythonic.ninja'

app_name = 'mosaico'
urlpatterns = [
    url(r'^viewset/', MosaicoViewSet.as_view({'get': 'list', 'post': 'create'}), name='viewset'),
]
