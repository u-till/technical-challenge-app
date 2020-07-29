from django.db import models
from question.models import Question


class Tip(models.Model):
    content = models.CharField(
        max_length=1500
    )

    discount_value = models.FloatField(
        null=True,
        blank=True
    )

    created = models.DateTimeField(
        auto_now_add=True
    )

    updated = models.DateTimeField(
        auto_now=True
    )

    question = models.ForeignKey(
        to=Question,
        on_delete=models.CASCADE,
        related_name='fk_tip_question',
        null=True,
        blank=True
    )

    def __str__(self):
        return f'Tip {self.pk} for Question: {self.question.id}'
