from django.db import models

from django.conf import settings

from question.models import Question


class Tip(models.Model):
    content = models.CharField(max_length=1500)

    discount_value = models.FloatField(null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    updated = models.DateTimeField(auto_now_add=True)

    question = models.ForeignKey(to=Question, on_delete=models.CASCADE, related_name='fk_tip_question', null=True, blank=True)