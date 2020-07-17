import random
from django.contrib.auth.models import AbstractUser
from django.db import models


def code_generator(length=5):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


class User(AbstractUser):
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    email = models.EmailField(
        unique=True
    )

    phone = models.CharField(
        max_length=18,
        null=True,
        blank=True
    )

    updated = models.DateTimeField(
        auto_now_add=True
    )

    avatar = models.ImageField(
        blank=True,
        null=True
    )

    code = models.CharField(
        max_length=15,
        default=code_generator
    )

    def __str__(self):
        return f'User #{self.pk} - Email: {self.email}'
