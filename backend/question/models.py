from django.db import models

from django.conf import settings


class Question(models.Model):
    DIFFICULTY = [
        ('E', 'Easy'),
        ('I', 'Intermediate'),
        ('H', 'Hard')
    ]

    instructions = models.CharField(max_length=2500)

    difficulty = models.CharField(max_length=1, choices=DIFFICULTY)

    points_value = models.IntegerField(null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    question_creator = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='fk_question_creator', null=True, blank=True)

    def __str__(self):
        return f'{self.pk}: {self.instructions}'
