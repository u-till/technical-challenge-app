from rest_framework import serializers

from question.models import Question


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ['id', 'program', 'instructions', 'difficulty', 'points_value', 'question_creator']
