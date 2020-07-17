from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'updated']


class ValidationUserSerializer(UserSerializer):
    password_repeat = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    code = serializers.CharField(
        write_only=True,
        required=True,
    )

    class Meta:
        model = User
        fields = ['code', 'email', 'first_name', 'last_name', 'username', 'avatar', 'password', 'password_repeat']

    def validate(self, data):
        try:
            target_profile = User.objects.get(email=data.get('email'))
        except User.DoesNotExist:
            raise serializers.ValidationError({"detail": "Your email doesn't match any profile or is invalid."})
        if data.get('code') != target_profile.code:
            raise serializers.ValidationError({"detail": "Your validation code is incorrect"})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"detail": "Password and Password Repeat do not match"})
        if data.get('password') == "Propulsion2020":
            raise serializers.ValidationError({"detail": "You need to change your password"})
        return data
