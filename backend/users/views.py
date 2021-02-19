from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

from .models import User
from .serializers import UserSerializer, SignUpSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return SignUpSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user



