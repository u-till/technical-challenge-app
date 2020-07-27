import random
from django.core.mail import EmailMultiAlternatives
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView, \
    RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from challenge.models import Challenge
from challenge.serializers import ChallengeSerializer
from email_content.email_content import *
from question.models import Question
from user.models import User


class CreateChallenge(CreateAPIView):
    """
    post:
    Creates and returns a new Challenge by the logged in User.
    Requires - User ID of candidate Challenge is being assigned to.
    """
    serializer_class = ChallengeSerializer

    def create(self, request, *args, **kwargs):
        candidate = User.objects.get(id=request.data['candidate'])
        challenge = Challenge(creator=request.user, candidate=candidate)
        challenge.status = 'SENT'
        challenge.save()
        easy_questions = random.sample(list(Question.objects.filter(difficulty='E')), 3)
        intermediate_questions = random.sample(list(Question.objects.filter(difficulty='I')), 2)
        hard_questions = random.sample(list(Question.objects.filter(difficulty='H')), 1)
        challenge.questions.set(easy_questions + intermediate_questions + hard_questions)
        email = EmailMultiAlternatives()
        email.subject = 'Propulsion Academy - You have a new Challenge!'
        email.to = [candidate.email]
        if candidate.is_active:
            email.attach_alternative(generate_challenge_created_content(candidate), "text/html")
        else:
            email.attach_alternative(generate_challenge_created_when_inactive_content(candidate), "text/html")
        email.send(fail_silently=False)
        return Response(status=200)


class RetrieveUpdateDestroyChallenge(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a Challenge with the given id.
    patch:
    Update a Challenge with the given id.
    delete:
    Delete a Challenge with the given id.
    """
    http_method_names = ['get', 'patch', 'delete']
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'


class RetrieveChallengeAsCandidate(RetrieveAPIView):
    """
     get:
     Retrieve a Challenge with the given id.
     Candidates have permission.
     """
    http_method_names = ['get', 'patch', 'delete']
    permission_classes = [IsAuthenticated]
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'


class ListChallenges(ListAPIView):
    """
    get:
    Returns a list of all Challenges.
    """
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()


class ListUserChallengesView(ListAPIView):
    """
    get:
    Returns a list of all Challenges for the logged in User.
    Candidates have permissions.
    """

    serializer_class = ChallengeSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = request.user.fk_challenges_assigned.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StartChallenge(UpdateAPIView):
    """
    patch:
    Sets the started time of a given challenge to js Date.timeNow() value. Can only be updated once.
    Candidates have permission.
    """
    http_method_names = ['patch']
    permission_classes = [IsAuthenticated]
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'

    def partial_update(self, request, *args, **kwargs):
        started = request.data['started']
        challenge = Challenge.objects.get(id=kwargs['id'])
        if challenge.started is None:
            challenge.started = started
            challenge.status = 'STARTED'
            challenge.save()
        return Response(status=200)


class ChallengeScore(UpdateAPIView):
    """
    patch:
    Update the final score of a Challenge with the given id. Can only be updated once.
    Candidates have permissions.
    """
    http_method_names = ['patch']
    permission_classes = [IsAuthenticated]
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'

    def partial_update(self, request, *args, **kwargs):
        score = request.data['score']
        challenge = Challenge.objects.get(id=kwargs['id'])
        candidate = User.objects.get(id=challenge.candidate_id)
        creator = User.objects.get(id=challenge.creator_id)
        if challenge.score is None:
            challenge.score = score
            challenge.save()
            candidate_email = EmailMultiAlternatives()
            candidate_email.subject = 'Propulsion Academy - Challenge Results'
            candidate_email.to = [candidate.email]
            creator_email = EmailMultiAlternatives()
            creator_email.subject = f'Challenge Results - Candidate: {candidate.first_name} {candidate.last_name}'
            creator_email.to = [creator.email]
            if challenge.score < 40:
                challenge.status = 'FAILED'
                challenge.save()
                html_content_candidate_email = generate_challenge_score_failed_candidate(candidate)
                html_content_creator_email = generate_challenge_score_failed_creator(creator, candidate, challenge)
            elif 40 <= challenge.score < 70:
                challenge.status = 'NEEDS REVIEW'
                challenge.save()
                html_content_candidate_email = generate_challenge_score_needs_review_candidate(candidate, challenge)
                html_content_creator_email = generate_challenge_score_needs_review_creator(creator, candidate,
                                                                                           challenge)
            else:
                challenge.status = 'PASSED'
                challenge.save()
                html_content_candidate_email = generate_challenge_score_passed_candidate(candidate)
                html_content_creator_email = generate_challenge_score_passed_creator(creator, candidate, challenge)
            candidate_email.attach_alternative(html_content_candidate_email, "text/html")
            candidate_email.send(fail_silently=False)
            creator_email.attach_alternative(html_content_creator_email, "text/html")
            creator_email.send(fail_silently=False)
        return Response(status=200)


class ResendChallengeCreatedEmail(UpdateAPIView):
    """
    patch:
    Resend the email to the candidate that given Challenge was created.
    Only works if the challenge wasn't started yet.
    """
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'

    def patch(self, request, *args, **kwargs):
        challenge = Challenge.objects.get(id=kwargs['id'])
        candidate = User.objects.get(id=challenge.candidate_id)
        email = EmailMultiAlternatives()
        email.subject = 'Propulsion Academy - You have a new Challenge!'
        email.to = [candidate.email]
        email.attach_alternative(generate_challenge_created_content(candidate), "text/html")
        email.send(fail_silently=False)
        return Response(status=200)


class ResendChallengeScoreEmail(UpdateAPIView):
    """
    patch:
    Resend the email to the candidate/creator with given Challenge results.
    Only works if the challenge already have a score.
    """
    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'

    def patch(self, request, *args, **kwargs):
        challenge = Challenge.objects.get(id=kwargs['id'])
        candidate = User.objects.get(id=challenge.candidate_id)
        creator = User.objects.get(id=challenge.creator_id)
        candidate_email = EmailMultiAlternatives()
        candidate_email.subject = 'Propulsion Academy - Challenge Results'
        candidate_email.to = [candidate.email]
        creator_email = EmailMultiAlternatives()
        creator_email.subject = f'Challenge Results - Candidate: {candidate.first_name} {candidate.last_name}'
        creator_email.to = [creator.email]
        if challenge.score < 40:
            html_content_candidate_email = generate_challenge_score_failed_candidate(candidate)
            html_content_creator_email = generate_challenge_score_failed_creator(creator, candidate, challenge)
        elif 40 <= challenge.score < 70:
            html_content_candidate_email = generate_challenge_score_needs_review_candidate(candidate, challenge)
            html_content_creator_email = generate_challenge_score_needs_review_creator(creator, candidate,
                                                                                       challenge)
        else:
            html_content_candidate_email = generate_challenge_score_passed_candidate(candidate)
            html_content_creator_email = generate_challenge_score_passed_creator(creator, candidate, challenge)
        candidate_email.attach_alternative(html_content_candidate_email, "text/html")
        candidate_email.send(fail_silently=False)
        creator_email.attach_alternative(html_content_creator_email, "text/html")
        creator_email.send(fail_silently=False)
        return Response(status=200)
