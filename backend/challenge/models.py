from django.db import models
from django.conf import settings
from question.models import Question


class Challenge(models.Model):
    STATUS = [
        ('CREATED', 'CREATED'),
        ('SENT', 'SENT'),
        ('STARTED', 'STARTED'),
        ('PASSED', 'PASSED'),
        ('NEEDS REVIEW', 'NEEDS REVIEW'),
        ('FAILED', 'FAILED')
    ]

    score = models.IntegerField(
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=30,
        default='CREATED',
        choices=STATUS
    )

    created = models.DateTimeField(
        auto_now_add=True
    )

    updated = models.DateTimeField(
        auto_now=True
    )

    started = models.CharField(
        max_length=150,
        null=True,
        blank=True
    )

    questions = models.ManyToManyField(
        to=Question,
        related_name='challenge_questions'
    )

    creator = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name='fk_staff_who_created',
        null=True,
        blank=True
    )

    candidate = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='fk_challenges_assigned',
        null=True,
        blank=True
    )

    def __str__(self):
        return f'Challenge #{self.pk} for {self.candidate.first_name} {self.candidate.last_name}'
