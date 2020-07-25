from rest_framework import serializers
from challenge.serializers import ChallengeSerializer
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    fk_challenges_assigned = ChallengeSerializer(
        required=False,
        read_only=True,
        many=True
    )

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'avatar', 'fk_challenges_assigned', 'is_staff',
                  'date_joined']


class ValidationUserSerializer(UserSerializer):
    password_repeat = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'avatar', 'password', 'password_repeat',
                  'is_active']

    def validate(self, data):
        try:
            User.objects.get(email=data.get('email'))
        except User.DoesNotExist:
            raise serializers.ValidationError({"detail": "Your email doesn't match any User or is invalid."})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"detail": "Password and Password Repeat do not match"})
        if data.get('password').lower() == "propulsion2020":
            raise serializers.ValidationError({"detail": "You must choose a different password"})
        return data


class PasswordResetSerializer(UserSerializer):
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

    email = serializers.CharField(
        write_only=True,
        required=True,
    )

    class Meta:
        model = User
        fields = ['email', 'code', 'password', 'password_repeat']

    def validate(self, data):
        target_profile = User.objects.get(email=data.get('email'))
        if data.get('code') != target_profile.code:
            raise serializers.ValidationError({"detail": "Your Validation Code is incorrect"})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"detail": "Password and Password Repeat do not match"})
        return data
