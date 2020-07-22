from django.core.mail import EmailMultiAlternatives
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView, \
    RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
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
        email = EmailMultiAlternatives()
        email.subject = f'Propulsion Academy - You have a new Challenge!'
        email.to = [candidate.email]
        html_content = f"""<h2 style="font-weight:normal">Get ready!</h2>
        <h3 style="font-weight:normal">{candidate.first_name} {candidate.last_name} you have a new challenge to solve!</h3>
        <h3 style="font-weight:normal">Please click the link below to go to login and start your challenge:</h3>
        <h3 style="font-weight:normal">https://tech-challenge.propulsion-learn.ch/login/</h3>
        <h3 style="font-weight:normal">You can find the challenge in your personal account after the login it's successfully done.</h3>
        <p><strong>Propulsion Academy</strong><br>
        Technoparkstrasse 1<br>
        8005 Zürich, Switzerland<br>
        https://propulsion.academy/full-stack</p>
        <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
        """
        email.attach_alternative(html_content, "text/html")
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


class RetrieveChallengeAsCandidate(RetrieveAPIView):
    """
     get:
     Retrieve a challenge with the given id.

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
    Returns the list of all challenges.
    """

    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()


class ListUserChallengesView(ListAPIView):
    """
    get:
    Returns the list of all challenges for the logged in user.

    Candidates have permissions
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
    Update the date and time when the challenge with the given id it's started. Can be updated just once.

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
            challenge.save()
        return Response(status=200)


class ChallengeScore(UpdateAPIView):
    """
    patch:
    Update the final score of a challenge with the given id. Can be updated just once.

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
            email = EmailMultiAlternatives()
            email.subject = f'Propulsion Academy - Challenge Results'
            email.to = [candidate.email]
            if challenge.score < 40:
                result = 'Failed'
                html_content = f"""<h3 style="font-weight:normal">Unfortunately you didn't made it.</h3>
                        <h3 style="font-weight:normal">Better luck next time</h3>
                        <p><strong>Propulsion Academy</strong><br>
                        Technoparkstrasse 1<br>
                        8005 Zürich, Switzerland<br>
                        https://propulsion.academy/full-stack</p>
                        <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                        """
            elif 40 <= challenge.score < 70:
                result = 'Need review'
                html_content = f"""<h3 style="font-weight:normal">Good job.</h3>
                         <h3 style="font-weight:normal">You will be contacted by Propulsion with your results soon</h3>
                         <p><strong>Propulsion Academy</strong><br>
                         Technoparkstrasse 1<br>
                         8005 Zürich, Switzerland<br>
                         https://propulsion.academy/full-stack</p>
                         <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                         """
            else:
                result = 'Passed'
                html_content = f"""<h3 style="font-weight:normal">Great job</h3>
                        <h3 style="font-weight:normal">You passed the challenge.</h3>
                        <p><strong>Propulsion Academy</strong><br>
                        Technoparkstrasse 1<br>
                        8005 Zürich, Switzerland<br>
                        https://propulsion.academy/full-stack</p>
                        <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                        """
            email.attach_alternative(html_content, "text/html")
            email.send(fail_silently=False)
            msg = EmailMultiAlternatives()
            msg.subject = f'Challenge Results - Candidate: {candidate.first_name} {candidate.last_name}'
            msg.to = [creator.email]
            html_content2 = f"""<h3 style="font-weight:normal">Candidate: {candidate.first_name} {candidate.last_name}</h3>
                                    <h3 style="font-weight:normal">Email: {candidate.email}</h3>
                                    <h3 style="font-weight:normal">Phone: {candidate.phone}</h3>
                                    <h3 style="font-weight:normal">Score: {challenge.score}</h3>  
                                    <h3 style="font-weight:normal">Result: {result}</h3>
                                    <p><strong>Propulsion Academy</strong><br>
                                    Technoparkstrasse 1<br>
                                    8005 Zürich, Switzerland<br>
                                    https://propulsion.academy/full-stack</p>
                                    <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                                    """
            msg.attach_alternative(html_content2, "text/html")
            msg.send(fail_silently=False)

        return Response(status=200)
