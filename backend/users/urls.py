from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UserViewSet, CurrentUserView, GoogleLogin


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    # JWT auth
    path('auth/token/obtain/', TokenObtainPairView.as_view(), name='obtain_jwt_token'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='refresh_jwt_token'),

    path('allauth/', include('allauth.urls')),  # to make possible reversing allauth urls

    path('users/me/', CurrentUserView.as_view()),

    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/login/google/', GoogleLogin.as_view(), name='google-login'),
] + router.urls
