from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser

from program.models import Program
from program.serializers import ProgramSerializer


class CreateProgram(CreateAPIView):
    serializer_class = ProgramSerializer
    permission_classes = [IsAdminUser]


class RetrieveUpdateDestroyProgram(RetrieveUpdateDestroyAPIView):
    serializer_class = ProgramSerializer
    queryset = Program.objects.all()
    lookup_field = 'id'
    permission_classes = [IsAdminUser]


class ListPrograms(ListAPIView):
    serializer_class = ProgramSerializer
    queryset = Program.objects.all()
    permission_classes = [IsAdminUser]
