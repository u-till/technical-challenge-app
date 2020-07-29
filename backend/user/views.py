from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from rest_framework import filters, status
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from email_content.email_content import generate_new_user, generate_password_reset
from user.models import User, code_generator
from user.serializers import UserSerializer, ValidationUserSerializer, PasswordResetSerializer


class CreateUserView(CreateAPIView):
    """
    post:
    Creates and returns a new User. The User will be inactive until the validation it's done.
    The default password for a new inactive user will be Propulsion2020.
    The default username is the email of the user.
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
        email.subject = 'Propulsion Academy - New User Verification'
        email.to = [new_user.email]
        html_content = generate_new_user(new_user)
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)
        return new_user


class ValidateUserView(UpdateAPIView):
    """
    patch:
    A User can validate the profile, the password must be changed.
    """
    http_method_names = ['patch']
    permission_classes = [AllowAny]
    serializer_class = ValidationUserSerializer
    lookup_field = "id"
    disabled_fields = set()
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
    Returns a list of all Users.
    Search can be made by first_name, last_name or username
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields = ['first_name', 'last_name', 'username']
    filter_backends = (filters.SearchFilter,)
    permission_classes = [IsAuthenticated]


class RetrieveUpdateDestroySpecificUserView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a User with the given id.
    patch:
    Update a User with the given id.
    delete:
    Delete a User with the given id.
    """
    http_method_names = ['get', 'patch', 'delete']
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = User.objects.get(id=kwargs['id'])
        user.username = request.data['email']
        user.save()
        return self.partial_update(request, *args, **kwargs)


class RetrieveUpdateDestroyLoggedInUserView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve the logged in User.
    patch:
    Update the logged in User.
    delete:
    Delete the logged in User.
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


class ResendUserValidationEmail(UpdateAPIView):
    """
    patch:
    Resend the email asking User to verify profile.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'

    def patch(self, request, *args, **kwargs):
        new_user = User.objects.get(id=kwargs['id'])
        email = EmailMultiAlternatives()
        email.subject = 'Propulsion Academy - New User Validation'
        email.to = [new_user.email]
        html_content = generate_new_user(new_user)
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)
        return Response(status=200)


class CreatePasswordResetRequestView(CreateAPIView):
    """
    post:
    Creates a reset password email with validation code sent to the email provided.
    Email required.
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetSerializer

    def create(self, request, *args, **kwargs):
        try:
            target_user = User.objects.all().get(email=request.data['email'])
            target_user.code = code_generator()
            target_user.save()
            email = EmailMultiAlternatives()
            email.subject = 'Propulsion Academy - Password Reset'
            email.to = [target_user.email]
            html_content = generate_password_reset(target_user)
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
