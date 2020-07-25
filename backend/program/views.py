from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from program.models import Program
from program.serializers import ProgramSerializer


class CreateProgram(CreateAPIView):
    """
    post:
    Creates and returns a new Program.
    """
    serializer_class = ProgramSerializer


class RetrieveUpdateDestroyProgram(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a Program with the given id.
    patch:
    Update a Program with the given id.
    delete:
    Delete a Program with the given id.
    """
    http_method_names = ['get', 'patch', 'delete']
    serializer_class = ProgramSerializer
    queryset = Program.objects.all()
    lookup_field = 'id'


class ListPrograms(ListAPIView):
    """
    get:
    Returns a list of all Programs.
    """
    serializer_class = ProgramSerializer
    queryset = Program.objects.all()
