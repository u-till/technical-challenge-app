from django.core.mail import EmailMessage
from rest_framework import status
from django.utils.dateparse import parse_date
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView
from rest_framework.response import Response
from challenge.models import Challenge
from challenge.serializers import ChallengeSerializer
from user.models import User


class CreateChallenge(CreateAPIView):
    """
    post:
    Creates and returns a new challenge.

    Creator is always the logged user.

    Candidate needs to be an user id.
    """

    serializer_class = ChallengeSerializer

    def create(self, request, *args, **kwargs):
        candidate = User.objects.get(id=request.data['candidate'])
        challenge = Challenge(creator=request.user, candidate=candidate)
        challenge.save()
        challenge.questions.set(request.data['questions'])
        email = EmailMessage()
        email.subject = f'Propulsion Academy - You have a new Challenge!'
        email.body = f"""Get ready!

{candidate.first_name} {candidate.last_name} you have a new challenge to solve!
Please click the link below to go to login and start your challenge:

https://tech-challenge.propulsion-learn.ch/login/

You can find the challenge in your personal account after the logged in it's successfully done.
"""
        email.to = [candidate.email]
        email.send(fail_silently=False)
        return Response(status=200)


class RetrieveUpdateDestroyChallenge(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a challenge with the given id.
    patch:
    Update a challenge with the given id.
    delete:
    Delete a challenge with the given id.
    """

    http_method_names = ['get', 'patch', 'delete']

    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'


class ListChallenges(ListAPIView):
    """
    get:
    Returns the list of all challenges.
    """

    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()


class ListUserChangesView(ListAPIView):
    """
    get:
    Returns the list of all challenges for the logged in user.
    """
    serializer_class = ChallengeSerializer
    permission_classes = []

    def list(self, request, *args, **kwargs):
        queryset = request.user.fk_challenges_assigned.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StartChallenge(UpdateAPIView):
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'

    http_method_names = ['patch']

    def partial_update(self, request, *args, **kwargs):
        timer = request.data['timer']
        challenge = Challenge.objects.get(id=kwargs['id'])
        if challenge.timer == "0":
            challenge.timer = timer
            challenge.save()
        return Response(status=200)
