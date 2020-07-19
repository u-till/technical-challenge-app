from rest_framework import serializers
from program.serializers import ProgramSerializer
from question.models import Question


class ListQuestionSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(
        required=False,
        many=True
    )

    class Meta:
        model = Question
        fields = ['id', 'name', 'program', 'instructions', 'difficulty', 'question_creator']


class CreateQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'name', 'program', 'instructions', 'difficulty', 'question_creator']