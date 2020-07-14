from django.db import models

from django.conf import settings


class Registration(models.Model):
    email = models.EmailField(unique=True)

    is_staff = models.BooleanField()

    code = models.CharField(max_length=20, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    updated = models.DateTimeField(auto_now_add=True)

    user = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='registration_user', null=True, blank=True)

    def __str__(self):
        return f'{self.pk}: {self.email}'