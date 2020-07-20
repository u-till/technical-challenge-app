from rest_framework import serializers

from challenge.models import Challenge


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ['id', 'score', 'status', 'created', 'timer', 'updated', 'questions', 'creator', 'candidate']
