from rest_framework import serializers
from challenge.models import Challenge
from question.serializers import ListQuestionSerializer


class ChallengeSerializer(serializers.ModelSerializer):
    questions = ListQuestionSerializer(
        read_only=True,
        many=True,
    )

    class Meta:
        model = Challenge
        fields = ['id', 'score', 'status', 'created', 'updated', 'questions', 'creator', 'candidate']
