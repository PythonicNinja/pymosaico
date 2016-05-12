# -*- coding: utf-8 -*-
# CREATED ON DATE: 12.05.2016
from django.conf.urls import url

from .views import *

__author__ = 'mail@pythonic.ninja'

app_name = 'images'
urlpatterns = [
    url(r'^folders/viewset/', ImageFolderViewSet.as_view({'get': 'list'}), name='folders_viewset'),
]
