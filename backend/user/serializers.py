from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'avatar', 'fk_challenges_assigned']


class ValidationUserSerializer(UserSerializer):
    password_repeat = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'avatar', 'password', 'password_repeat', 'is_active']

    def validate(self, data):
        try:
            target_profile = User.objects.get(email=data.get('email'))
        except User.DoesNotExist:
            raise serializers.ValidationError({"detail": "Your email doesn't match any profile or is invalid."})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"detail": "Password and Password Repeat do not match"})
        if data.get('password') == "Propulsion2020":
            raise serializers.ValidationError({"detail": "You need to change your password"})
        return data
