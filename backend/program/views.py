from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView

from program.models import Program
from program.serializers import ProgramSerializer


class CreateProgram(CreateAPIView):
    """
    post:
    Creates and returns a new program.
    """

    serializer_class = ProgramSerializer


class RetrieveUpdateDestroyProgram(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a program with the given id.
    patch:
    Update a program with the given id.
    delete:
    Delete a program with the given id.
    """

    http_method_names = ['get', 'patch', 'delete']

    serializer_class = ProgramSerializer
    queryset = Program.objects.all()
    lookup_field = 'id'


class ListPrograms(ListAPIView):
    """
    get:
    Returns the list of all programs.
    """

    serializer_class = ProgramSerializer
    queryset = Program.objects.all()
