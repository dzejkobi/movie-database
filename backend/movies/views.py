from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import FavouriteSerializer


class FavouriteViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = FavouriteSerializer

    def get_queryset(self):
        return self.request.user.favourite_set.all()


