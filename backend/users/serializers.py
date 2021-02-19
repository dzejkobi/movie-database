from django.core import exceptions
from rest_framework import serializers

import django.contrib.auth.password_validation as validators

from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'pk', 'username', 'first_name', 'last_name', 'email',
            'is_staff', 'is_active', 'date_joined'
        ]


class SignUpSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        errors = dict()

        if data['password1'] != data['password2']:
            errors['password2'] = ['Passwords does not match!']

        try:
            validators.validate_password(password=data['password1'])
        except exceptions.ValidationError as e:
            errors['password2'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return data

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            is_active=True
        )
        user.set_password(validated_data['password1'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']
