import random
from django.core.mail import EmailMultiAlternatives
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView, \
    RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from challenge.models import Challenge
from challenge.serializers import ChallengeSerializer
from question.models import Question
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
        challenge.status = 'SENT'
        challenge.save()
        easy_questions = random.sample(list(Question.objects.filter(difficulty='E')), 3)
        intermediate_questions = random.sample(list(Question.objects.filter(difficulty='I')), 2)
        hard_questions = random.sample(list(Question.objects.filter(difficulty='H')), 1)
        challenge.questions.set(easy_questions + intermediate_questions + hard_questions)
        email = EmailMultiAlternatives()
        email.subject = f'Propulsion Academy - You have a new Challenge!'
        email.to = [candidate.email]
        html_content = f"""<table border="0" align="center" cellpadding="0" cellspacing="0"><h2 style="font-weight:normal">Hi, {candidate.first_name}! You have been assigned a Propulsion Academy Technical Challenge!</h2>
                <br></br>
                <h3 style="font-weight:normal">In order to start your challenge you need to login and go to Challenges on your personal area.</h3>
                <h3 style="font-weight:normal">Whenever you are ready to start your Technical Challenge, click on the button below.</h3>
                <br></br>
                <a href="https://tech-challenge.propulsion-learn.ch/login/"><button style="outline:none; background: #EF485C; border-radius: 40px; width: 180px; height: 40px; color: white; font-size: 16px; border: none;" >Go to login</button></a>
                <br></br>
                <br></br>
                <h3 style="font-weight:normal">If after clicking the button you are not redirected to the challenge please send us an email to support@propulsionacademy.com</h3>
                <h3 style="font-weight:normal">Regards,</h3>
                <p><strong>Full-Stack Propulsion Team</strong><br>
                Technoparkstrasse 1<br>
                8005 Zürich, Switzerland<br>
                https://propulsion.academy/full-stack</p>
                <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68"></table>        """
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
            challenge.status = 'STARTED'
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
            candidate_email = EmailMultiAlternatives()
            candidate_email.subject = f'Propulsion Academy - Challenge Results'
            candidate_email.to = [candidate.email]
            creator_email = EmailMultiAlternatives()
            creator_email.subject = f'Challenge Results - Candidate: {candidate.first_name} {candidate.last_name}'
            creator_email.to = [creator.email]
            if challenge.score < 40:
                challenge.status = 'FAILED'
                challenge.save()
                html_content_candidate_email = f"""<h3 style="font-weight:normal">Dear {candidate.first_name},</h3>
                        <h3 style="font-weight:normal">Though you demonstrated excellent motivation and willingness to learn in trying to pass the technical challenge, additional work is required to reach the level needed to get into the program. We recommend that you keep practicing with the intention of joining a future program.</h3>
                        <h3 style="font-weight:normal">Please continue reviewing the materials for the technical challenge as well as other similar online resources and let us know when you are ready to try again.</h3>
                        <h3 style="font-weight:normal">All the very best,</h3>
                        <br></br>
                        <p><strong>Propulsion Academy</strong><br>
                        Technoparkstrasse 1<br>
                        8005 Zürich, Switzerland<br>
                        https://propulsion.academy/full-stack</p>
                        <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68">                        """

                html_content_creator_email = f"""<h3>Hi, {creator.first_name}! The candidate {candidate.first_name} {candidate.last_name} got {challenge.score}% on the Propulsion Academy Technical Challenge!</h3>
                        <img height="100" src="https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Sad_Emoji_grande.png?v=1571606093">
                        <h3 style="font-weight:normal">Unfortunately, the candidate was not able to complete in a satisfactory manner the technical interview. Candidate was invited to participate on the next bootcamp.</h3>
                        <h3 style="font-weight:normal">Regards,</h3>
                        <p><strong>Propulsion Academy</strong><br>
                        Technoparkstrasse 1<br>
                        8005 Zürich, Switzerland<br>
                        https://propulsion.academy/full-stack</p>
                        <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                        """
            elif 40 <= challenge.score < 70:
                challenge.status = 'NEEDS REVIEW'
                challenge.save()
                html_content_candidate_email = f"""<h2 style="font-weight:normal">Hi, {candidate.first_name}! You got {challenge.score}% on your Propulsion Academy Technical Challenge.</h2>
                         <h3 style="font-weight:normal">We can see that you are almost there! However, we believe that a little more time and practice can be decisive for you to pass the test and for this, we would like to invite you for a second technical challenge within the next 7 days. We are confident that you can do it!</h3>
                         <h3 style="font-weight:normal">Expect an email from us when the next challenge becomes available on your personal area.</h3>
                         <h3 style="font-weight:normal">Regards,</h3>
                         <p><strong>Propulsion Academy</strong><br>
                         Technoparkstrasse 1<br>
                         8005 Zürich, Switzerland<br>
                         https://propulsion.academy/full-stack</p>
                         <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                         """
                html_content_creator_email = f"""<h3>Hi, {creator.first_name}! The candidate {candidate.first_name} {candidate.last_name} got {challenge.score}% on the Propulsion Academy Technical Challenge!</h3>
                         <img height="110" src="https://www.emojirequest.com/images/MehEmoji.jpg">
                         <h3 style="font-weight:normal">Under your discretion, the candidate can receive another opportunity.</h3>
                         <h3 style="font-weight:normal">Regards,</h3>
                         <p><strong>Propulsion Academy</strong><br>
                         Technoparkstrasse 1<br>
                         8005 Zürich, Switzerland<br>
                         https://propulsion.academy/full-stack</p>
                         <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                         """
            else:
                challenge.status = 'PASSED'
                challenge.save()
                html_content_candidate_email = f"""<h2 style="font-weight:normal">Hi, {candidate.first_name}! Congratulations! You passed the Propulsion Academy Technical Challenge!</h2>
                        <img height="150" src="https://66.media.tumblr.com/5dd57c2cb2e5801f662bf8c8a7fa91ab/c073e7987cb0c13a-be/s500x750/4919f4c52044d0e2654f92f6fc28c190c1ac8f52.gif">
                        <br></br>
                        <h3 style="font-weight:normal">We are very happy to see that you have completed the JavaScript test! You’ve proved that dedication and continuous learning end in an excellent outcome.</h3>
                        <h3 style="font-weight:normal">For the next step, we will send you an email with all the documents we need from you to make official your enrollment into the Full-Stack Development Program!</h3>
                        <h3 style="font-weight:normal">Regards,</h3>
                        <p><strong>Propulsion Academy</strong><br>
                        Technoparkstrasse 1<br>
                        8005 Zürich, Switzerland<br>
                        https://propulsion.academy/full-stack</p>
                        <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                        """
                html_content_creator_email = f"""<h3>Hi, {creator.first_name}! The candidate {candidate.first_name} {candidate.last_name} got {challenge.score}% on the Propulsion Academy Technical Challenge!</h3>
                        <img height="100" src="https://i.pinimg.com/originals/93/76/f4/9376f4bc2cf659688e4fe9887adddc4a.png">
                        <h3 style="font-weight:normal">The candidate is ready to get the documentation to get officially enrolled.</h3>
                        <h3 style="font-weight:normal">Regards,</h3>
                        <p><strong>Propulsion Academy</strong><br>
                        Technoparkstrasse 1<br>
                        8005 Zürich, Switzerland<br>
                        https://propulsion.academy/full-stack</p>
                        <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                        """
            candidate_email.attach_alternative(html_content_candidate_email, "text/html")
            candidate_email.send(fail_silently=False)
            creator_email.attach_alternative(html_content_creator_email, "text/html")
            creator_email.send(fail_silently=False)
        return Response(status=200)


class ResendChallengeCreatedEmail(UpdateAPIView):
    """
    patch:
    Resend the email informing the candidate that a challenge was created.
    Only works if the challenge wasn't started yet.
    """

    serializer_class = ChallengeSerializer
    queryset = Challenge.objects.all()
    lookup_field = 'id'

    def patch(self, request, *args, **kwargs):
        challenge = Challenge.objects.get(id=kwargs['id'])
        candidate = User.objects.get(id=challenge.candidate_id)
        email = EmailMultiAlternatives()
        email.subject = f'Propulsion Academy - You have a new Challenge!'
        email.to = [candidate.email]
        html_content = f"""<table border="0" align="center" cellpadding="0" cellspacing="0"><h2 style="font-weight:normal">Hi, {candidate.first_name}! You have been assigned a Propulsion Academy Technical Challenge!</h2>
                        <br></br>
                        <h3 style="font-weight:normal">In order to start your challenge you need to login and go to Challenges on your personal area.</h3>
                        <h3 style="font-weight:normal">Whenever you are ready to start your Technical Challenge, click on the button below.</h3>
                        <br></br>
                        <a href="https://tech-challenge.propulsion-learn.ch/login/"><button style="outline:none; background: #EF485C; border-radius: 40px; width: 180px; height: 40px; color: white; font-size: 16px; border: none;" >Go to login</button></a>
                        <br></br>
                        <br></br>
                        <h3 style="font-weight:normal">If after clicking the button you are not redirected to the challenge please send us an email to support@propulsionacademy.com</h3>
                        <h3 style="font-weight:normal">Regards,</h3>
                        <p><strong>Full-Stack Propulsion Team</strong><br>
                        Technoparkstrasse 1<br>
                        8005 Zürich, Switzerland<br>
                        https://propulsion.academy/full-stack</p>
                        <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68"></table>        """
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)
        return Response(status=200)


class ResendChallengeScoreEmail(UpdateAPIView):
    """
    patch:
    Resend the email informing the candidate his score. Also send an email to the creator of the challenge with the challenge score.
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
        candidate_email.subject = f'Propulsion Academy - Challenge Results'
        candidate_email.to = [candidate.email]
        creator_email = EmailMultiAlternatives()
        creator_email.subject = f'Challenge Results - Candidate: {candidate.first_name} {candidate.last_name}'
        creator_email.to = [creator.email]
        if challenge.score < 40:
            html_content_candidate_email = f"""<h3 style="font-weight:normal">Dear {candidate.first_name},</h3>
                    <h3 style="font-weight:normal">Though you demonstrated excellent motivation and willingness to learn in trying to pass the technical challenge, additional work is required to reach the level needed to get into the program. We recommend that you keep practicing with the intention of joining a future program.</h3>
                    <h3 style="font-weight:normal">Please continue reviewing the materials for the technical challenge as well as other similar online resources and let us know when you are ready to try again.</h3>
                    <h3 style="font-weight:normal">All the very best,</h3>
                    <br></br>
                    <p><strong>Propulsion Academy</strong><br>
                    Technoparkstrasse 1<br>
                    8005 Zürich, Switzerland<br>
                    https://propulsion.academy/full-stack</p>
                    <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68">                        """
            html_content_creator_email = f"""<h3>Hi, {creator.first_name}! The candidate {candidate.first_name} {candidate.last_name} got {challenge.score}% on the Propulsion Academy Technical Challenge!</h3>
                    <img height="100" src="https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Sad_Emoji_grande.png?v=1571606093">
                    <h3 style="font-weight:normal">Unfortunately, the candidate was not able to complete in a satisfactory manner the technical interview. Candidate was invited to participate on the next bootcamp.</h3>
                    <h3 style="font-weight:normal">Regards,</h3>
                    <p><strong>Propulsion Academy</strong><br>
                    Technoparkstrasse 1<br>
                    8005 Zürich, Switzerland<br>
                    https://propulsion.academy/full-stack</p>
                    <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                    """
        elif 40 <= challenge.score < 70:
            html_content_candidate_email = f"""<h2 style="font-weight:normal">Hi, {candidate.first_name}! You got {challenge.score}% on your Propulsion Academy Technical Challenge.</h2>
                     <h3 style="font-weight:normal">We can see that you are almost there! However, we believe that a little more time and practice can be decisive for you to pass the test and for this, we would like to invite you for a second technical challenge within the next 7 days. We are confident that you can do it!</h3>
                     <h3 style="font-weight:normal">Expect an email from us when the next challenge becomes available on your personal area.</h3>
                     <h3 style="font-weight:normal">Regards,</h3>
                     <p><strong>Propulsion Academy</strong><br>
                     Technoparkstrasse 1<br>
                     8005 Zürich, Switzerland<br>
                     https://propulsion.academy/full-stack</p>
                     <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                     """
            html_content_creator_email = f"""<h3>Hi, {creator.first_name}! The candidate {candidate.first_name} {candidate.last_name} got {challenge.score}% on the Propulsion Academy Technical Challenge!</h3>
                     <img height="110" src="https://www.emojirequest.com/images/MehEmoji.jpg">
                     <h3 style="font-weight:normal">Under your discretion, the candidate can receive another opportunity.</h3>
                     <h3 style="font-weight:normal">Regards,</h3>
                     <p><strong>Propulsion Academy</strong><br>
                     Technoparkstrasse 1<br>
                     8005 Zürich, Switzerland<br>
                     https://propulsion.academy/full-stack</p>
                     <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                     """
        else:
            html_content_candidate_email = f"""<h2 style="font-weight:normal">Hi, {candidate.first_name}! Congratulations! You passed the Propulsion Academy Technical Challenge!</h2>
                    <img height="150" src="https://66.media.tumblr.com/5dd57c2cb2e5801f662bf8c8a7fa91ab/c073e7987cb0c13a-be/s500x750/4919f4c52044d0e2654f92f6fc28c190c1ac8f52.gif">
                    <br></br>
                    <h3 style="font-weight:normal">We are very happy to see that you have completed the JavaScript test! You’ve proved that dedication and continuous learning end in an excellent outcome.</h3>
                    <h3 style="font-weight:normal">For the next step, we will send you an email with all the documents we need from you to make official your enrollment into the Full-Stack Development Program!</h3>
                    <h3 style="font-weight:normal">Regards,</h3>
                    <p><strong>Propulsion Academy</strong><br>
                    Technoparkstrasse 1<br>
                    8005 Zürich, Switzerland<br>
                    https://propulsion.academy/full-stack</p>
                    <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                    """
            html_content_creator_email = f"""<h3>Hi, {creator.first_name}! The candidate {candidate.first_name} {candidate.last_name} got {challenge.score}% on the Propulsion Academy Technical Challenge!</h3>
                    <img height="100" src="https://i.pinimg.com/originals/93/76/f4/9376f4bc2cf659688e4fe9887adddc4a.png">
                    <h3 style="font-weight:normal">The candidate is ready to get the documentation to get officially enrolled.</h3>
                    <h3 style="font-weight:normal">Regards,</h3>
                    <p><strong>Propulsion Academy</strong><br>
                    Technoparkstrasse 1<br>
                    8005 Zürich, Switzerland<br>
                    https://propulsion.academy/full-stack</p>
                    <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                    """
        candidate_email.attach_alternative(html_content_candidate_email, "text/html")
        candidate_email.send(fail_silently=False)
        creator_email.attach_alternative(html_content_creator_email, "text/html")
        creator_email.send(fail_silently=False)
        return Response(status=200)
