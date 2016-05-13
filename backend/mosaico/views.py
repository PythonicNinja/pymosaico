from models import Mosaico
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import MosaicoSerializer, MosaicoCreateSerializer


class MosaicoViewSet(viewsets.ModelViewSet):
    serializer_class = MosaicoSerializer
    queryset = Mosaico.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        self.serializer_class = MosaicoCreateSerializer
        return super(MosaicoViewSet, self).create(request, *args, **kwargs)
