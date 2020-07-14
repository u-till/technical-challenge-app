from random import randint
from django.core.mail import send_mail
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from registration.models import Registration
from registration.serializers import RegistrationSerializer
from user.serializers import ValidationUserSerializer
from user.models import User


class RegistrationEmail(GenericAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        code = randint(100000, 999999)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        send_mail(
            'Validate your profile',
            'Complete your validation and have access to the following steps on the link below:\nHere is your validation code: {}\n'.format(code),
            'students@propulsionacademy.com',
            ['{}'.format(request.data['email'])],
            fail_silently=False,
        )
        serializer.save(code=code)
        return Response(serializer.data)


class RegistrationValidation(CreateAPIView):
    serializer_class = ValidationUserSerializer

    def post(self, request, *args, **kwargs):
        is_staff = request.user.is_staff
        disabled_fields = set()  # type: Set[str]
        if not is_staff:
            disabled_fields |= {
                'is_staff'
            }

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        target_profile = Registration.objects.all().get(email=request.data['email'])
        new_user = User.objects.create_user(email=request.data['email'], username=request.data['username'], password=request.data['password'], first_name=request.data['first_name'], last_name=request.data['last_name'], is_staff=target_profile.is_staff)
        self.perform_create(new_user)
        target_profile.user = new_user
        target_profile.save()
        return Response(status=200)
