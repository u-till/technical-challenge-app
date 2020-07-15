from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser

from challenge.models import Challenge
from challenge.serializers import ChallengeSerializer


class CreateChallenge(CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = ChallengeSerializer


class RetrieveUpdateDestroyChallenge(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'


class ListChallenges(ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
