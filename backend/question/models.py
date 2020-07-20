from django.contrib.postgres.fields import ArrayField
from django.db import models

from django.conf import settings

from program.models import Program


class Question(models.Model):
    DIFFICULTY = [
        ('E', 'Easy'),
        ('I', 'Intermediate'),
        ('H', 'Hard')
    ]

    name = models.CharField(max_length=100, default="Question")

    instructions = models.CharField(max_length=2500)

    difficulty = models.CharField(max_length=1, choices=DIFFICULTY)

    created = models.DateTimeField(auto_now_add=True)

    updated = models.DateTimeField(auto_now_add=True)

    question_creator = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='fk_question_creator', null=True, blank=True)

    program = models.ManyToManyField(to=Program, related_name='question_program')

    tests_for_question = ArrayField(
        models.CharField(
            max_length=200
        ),
        default=list,
        blank=True
    )

    def __str__(self):
        return f'{self.pk}: {self.instructions}'
