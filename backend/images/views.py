from models import ImageFolder
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import ImageFolderSerializer, ImageFolderCreateSerializer


class ImageFolderViewSet(viewsets.ModelViewSet):
    serializer_class = ImageFolderSerializer
    queryset = ImageFolder.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        self.serializer_class = ImageFolderCreateSerializer
        data = {'name': request.data.pop('name')}
        images = []
        for file_name, file in request.data.iteritems():
            if file:
                images.append(
                    {
                        'name': file_name,
                        'image': file
                    }
                )
        data['images'] = images
        serializer = ImageFolderCreateSerializer(data=data, context={
            'request': self.request
        })
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
