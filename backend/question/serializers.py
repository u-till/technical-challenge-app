from rest_framework import serializers
from question.models import Question


class ListQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'name', 'program', 'instructions', 'difficulty', 'question_creator', 'tests_for_question']


class CreateQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'name', 'program', 'instructions', 'difficulty', 'question_creator', 'tests_for_question']
