from rest_framework import filters
from rest_framework.generics import ListAPIView

from user.models import User
from user.serializers import UserSerializer


# get the list of all users
class ListUsers(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    search_fields = ['first_name', 'last_name']
    filter_backends = (filters.SearchFilter,)