from rest_framework import serializers
from challenge.models import Challenge
from question.serializers import ListQuestionSerializer
from user.models import User


class UserForChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']


class ChallengeSerializer(serializers.ModelSerializer):
    questions = ListQuestionSerializer(
        read_only=True,
        many=True,
    )

    candidate = UserForChallengeSerializer(
        read_only=True
    )

    creator = UserForChallengeSerializer(
        read_only=True
    )

    class Meta:
        model = Challenge
        fields = ['id', 'score', 'status', 'created', 'started', 'updated', 'questions', 'creator', 'candidate']
