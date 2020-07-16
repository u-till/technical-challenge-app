from rest_framework import filters
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from user.models import User
from user.serializers import UserSerializer, ValidationUserSerializer


class CreateUser(CreateAPIView):
    """
    post:
    Creates and returns a new user. The user will be inactive until the validation it's done.

    The default password for a new inactive user will be Propulsion2020.

    The default username it's the email of the user.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        new_user = User(email=serializer.validated_data['email'], username=serializer.validated_data['email'], is_active=False, is_staff=self.request.data['is_staff'], first_name=self.request.data['first_name'], last_name=self.request.data['last_name'])
        new_user.set_password("Propulsion2020")
        new_user.save()
        return new_user


class UserValidation(UpdateAPIView):
    """
     post:
     A user can validate the profile.

     The password needs to be change.
     """

    permission_classes = [AllowAny]
    serializer_class = ValidationUserSerializer
    lookup_field = "id"
    disabled_fields = set()  # type: Set[str]
    disabled_fields |= {
        'is_staff'
    }

    def patch(self, request, *args, **kwargs):
        updated_user = User.objects.get(id=kwargs['id'])
        updated_user.set_password(request.data['password'])
        updated_user.is_active = True
        updated_user.avatar = request.data['avatar']
        updated_user.save()
        return Response(status=200)


class ListUsers(ListAPIView):
    """
     get:
     Returns the list of all users.
     """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    search_fields = ['first_name', 'last_name', 'username']
    filter_backends = (filters.SearchFilter,)


class RetrieveUpdateDestroyUser(RetrieveUpdateDestroyAPIView):
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


class Me(RetrieveUpdateDestroyAPIView):
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
