from models import ImageFolder
from rest_framework import viewsets

from .serializers import ImageFolderSerializer


class ImageFolderViewSet(viewsets.ModelViewSet):
    serializer_class = ImageFolderSerializer
    queryset = ImageFolder.objects.all()
