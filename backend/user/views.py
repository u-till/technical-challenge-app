from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives, EmailMessage
from rest_framework import filters, status
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from user.models import User, code_generator
from user.serializers import UserSerializer, ValidationUserSerializer, PasswordResetSerializer


class CreateUserView(CreateAPIView):
    """
    post:
    Creates and returns a new user. The user will be inactive until the validation it's done.

    The default password for a new inactive user will be Propulsion2020.

    The default username it's the email of the user.
    """
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        new_user = User(email=serializer.validated_data['email'], username=serializer.validated_data['email'],
                        is_active=False, is_staff=self.request.data['is_staff'],
                        first_name=self.request.data['first_name'], last_name=self.request.data['last_name'],
                        phone=self.request.data['phone'])
        new_user.set_password("Propulsion2020")
        new_user.save()
        email = EmailMultiAlternatives()
        email.subject = f'Propulsion Academy - New Candidate Validation'
        email.to = [new_user.email]
        html_content = f"""<table border="0" align="center" cellpadding="0" cellspacing="0"><h2 style="font-weight:normal">Hi, {new_user.first_name}! Welcome to your Propulsion Academy Technical Interview!</h2>
                <br></br>
                <h3 style="font-weight:normal">In order to start using the platform, you need to verify your email.</h3>
                <h3 style="font-weight:normal">Please click the button below to confirm your user information:</h3>
                <br></br>
                <a href="https://tech-challenge.propulsion-learn.ch/verification/{new_user.id}?email={new_user.email}&first_name={new_user.first_name}&last_name={new_user.last_name}&phone={new_user.phone}"><button style="outline:none; background: #EF485C; border-radius: 40px; width: 180px; height: 40px; color: white; font-size: 16px; border: none;" >Go to verification</button></a>
                <br></br>
                <br></br>
                <h3 style="font-weight:normal">You will receive a follow-up email when your Technical Interview Challenge is ready.</h3>
                <h3 style="font-weight:normal">Regards,</h3>
                <p><strong>Full-Stack Propulsion Team</strong><br>
                Technoparkstrasse 1<br>
                8005 Zürich, Switzerland<br>
                https://propulsion.academy/full-stack</p>
                <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd"></table>        """
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)
        return new_user


class ValidateUserView(UpdateAPIView):
    """
     patch:
     A user can validate the profile.

     The password needs to be change.
     """
    http_method_names = ['patch']
    permission_classes = [AllowAny]
    serializer_class = ValidationUserSerializer
    lookup_field = "id"
    disabled_fields = set()  # type: Set[str]
    disabled_fields |= {
        'is_staff'
    }

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        target_user = User.objects.get(id=kwargs['id'])
        serializer = self.get_serializer(target_user, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        target_user.set_password(request.data['password'])
        target_user.is_active = True
        target_user.save()
        return Response(status=status.HTTP_202_ACCEPTED)


class ListUsersView(ListAPIView):
    """
    get:
    Returns the list of all users.

    Search can be made by first_name, last_name or username
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields = ['first_name', 'last_name', 'username']
    filter_backends = (filters.SearchFilter,)


class RetrieveUpdateDestroySpecificUserView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a user with the given id.
    patch:
    Update a user with the given id.
    delete:
    Delete a user with the given id.
    """
    http_method_names = ['get', 'patch', 'delete']
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'

    def patch(self, request, *args, **kwargs):
        user = User.objects.get(id=kwargs['id'])
        user.username = request.data['email']
        user.save()
        return self.partial_update(request, *args, **kwargs)


class RetrieveUpdateDestroyLoggedInUserView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve the logged user.
    patch:
    Update the logged user.
    delete:
    Delete the logged user.
    """
    http_method_names = ['get', 'patch', 'delete']
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        user = self.request.user
        user.username = request.data['email']
        user.save()
        return self.partial_update(request, *args, **kwargs)

class ResendChallengeScoreEmail(UpdateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'

    def patch(self, request, *args, **kwargs):
        new_user = User.objects.get(id=kwargs['id'])
        email = EmailMultiAlternatives()
        email.subject = f'Propulsion Academy - New Candidate Validation'
        email.to = [new_user.email]
        html_content = f"""<table border="0" align="center" cellpadding="0" cellspacing="0"><h2 style="font-weight:normal">Hi, {new_user.first_name}! Welcome to your Propulsion Academy Technical Interview!</h2>
                        <br></br>
                        <h3 style="font-weight:normal">In order to start using the platform, you need to verify your email.</h3>
                        <h3 style="font-weight:normal">Please click the button below to confirm your user information:</h3>
                        <br></br>
                        <a href="https://tech-challenge.propulsion-learn.ch/verification/{new_user.id}?email={new_user.email}&first_name={new_user.first_name}&last_name={new_user.last_name}&phone={new_user.phone}"><button style="outline:none; background: #EF485C; border-radius: 40px; width: 180px; height: 40px; color: white; font-size: 16px; border: none;" >Go to verification</button></a>
                        <br></br>
                        <br></br>
                        <h3 style="font-weight:normal">You will receive a follow-up email when your Technical Interview Challenge is ready.</h3>
                        <h3 style="font-weight:normal">Regards,</h3>
                        <p><strong>Full-Stack Propulsion Team</strong><br>
                        Technoparkstrasse 1<br>
                        8005 Zürich, Switzerland<br>
                        https://propulsion.academy/full-stack</p>
                        <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd"></table>        """
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)
        return Response(status=200)


class CreatePasswordResetRequestView(CreateAPIView):
    """
    post:
    Creates a reset password email with validation code sent to the email provided.
    email required
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetSerializer

    def create(self, request, *args, **kwargs):
        try:
            target_profile = User.objects.all().get(email=request.data['email'])
            target_profile.code = code_generator()
            target_profile.save()
            email = EmailMultiAlternatives()
            email.subject = 'Propulsion Academy - Password Reset'
            email.to = [target_profile.email]
            html_content = f"""<h3> Hi, {target_profile.first_name}!</h3>
                    <h3 style="font-weight:normal">Your password reset validation code is:</h3>
                    <h3>{target_profile.code}</h3>
                    <h3 style="font-weight:normal">Regards,</h3>
                    <p><strong>Full-Stack Propulsion Team</strong><br>
                    Technoparkstrasse 1<br>
                    8005 Zürich, Switzerland<br>
                    https://propulsion.academy/full-stack</p>
                    <img src="https://ci6.googleusercontent.com/proxy/D1srIpj53axfX_D5ZAZRlbc5aW_wo_qIcq9U0HynZroJDhCh-sS_cobQ8ulokzLaAm29-KHvII6JPVqy3tkJueK7TNtoX12ac-XXZg33ARbMSnZFJaozKxXKg6jrbks2O1NuFOGYPTDs0g0l0asVzEhuJLh7aYGPxZZejS1B5fmSlo_8CWH8Siri5c8dy4kn0yZPYly-oIw4lNS2LA=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1O94ewGHQ6a9Ys8n9oZvgDoaEBUEOdAKx&amp;revid=0B5Six9hxnFnSWmtZUGFXQWpxZFUyS0wxdjlpci9IWEcveE9NPQ" width="200" height="68" class="CToWUd">
                    """
            email.attach_alternative(html_content, "text/html")
            email.send(fail_silently=False)
            return Response(status=status.HTTP_202_ACCEPTED)
        except User.DoesNotExist:
            return Response({"detail": "Your email doesn't match any profile or is invalid."},
                            status=status.HTTP_400_BAD_REQUEST)


class ValidatePasswordResetRequestView(UpdateAPIView):
    """
    patch:
    Updates the password of the User tied to the email address.
    email, code, password, password_repeat required
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        try:
            target_profile = User.objects.all().get(email=request.data['email'])
            serializer = self.get_serializer(target_profile, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            target_profile.set_password(request.data['password'])
            target_profile.save()
            target_profile.code = code_generator()
            target_profile.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        except User.DoesNotExist:
            return Response({"detail": "Your email doesn't match any profile or is invalid."},
                            status=status.HTTP_400_BAD_REQUEST)