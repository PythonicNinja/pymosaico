from models import Mosaico
from rest_framework import viewsets

from .serializers import MosaicoSerializer


class MosaicoViewSet(viewsets.ModelViewSet):
    serializer_class = MosaicoSerializer
    queryset = Mosaico.objects.all()
