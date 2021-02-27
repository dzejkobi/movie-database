from django.urls import path, include

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from rest_framework.routers import DefaultRouter
from drf_social_oauth2 import urls as auth_urls

from .views import UserViewSet, CurrentUserView


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    # JWT auth
    path('auth/token/obtain/', obtain_jwt_token),
    path('auth/token/refresh/', refresh_jwt_token),

    path('auth/', include(auth_urls)),

    path('users/me/', CurrentUserView.as_view()),
] + router.urls
