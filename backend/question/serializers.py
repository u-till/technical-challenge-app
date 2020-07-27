from rest_framework import serializers
from question.models import Question
from tip.serializers import TipSerializer


class ListQuestionSerializer(serializers.ModelSerializer):
    fk_tip_question = TipSerializer(
        read_only=True,
        many=True
    )

    class Meta:
        model = Question
        fields = ['id', 'name', 'program', 'instructions', 'difficulty', 'question_creator', 'tests_for_question',
                  'fk_tip_question', 'created', 'updated']


class CreateQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'name', 'program', 'instructions', 'difficulty', 'question_creator', 'tests_for_question']
