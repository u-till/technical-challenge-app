import random

from django.contrib.auth.models import AbstractUser
from django.db import models


def code_generator(length=5):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


class User(AbstractUser):
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']


    email = models.EmailField(unique=True)

    updated = models.DateTimeField(auto_now_add=True)

    code = models.CharField(max_length=50, default=code_generator)

    def __str__(self):
        return self.email
