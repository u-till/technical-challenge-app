from django.contrib.auth.models import AbstractUser
from django.db import models

from registration.models import Registration


class User(AbstractUser):
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    email = models.EmailField(unique=True)

    updated = models.DateTimeField(auto_now_add=True)

    registration = models.OneToOneField(to=Registration, on_delete=models.CASCADE, related_name='user_registration', null=True, blank=True)

    def __str__(self):
        return self.email
