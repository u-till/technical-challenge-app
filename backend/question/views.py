from rest_framework import filters
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from question.models import Question
from question.serializers import ListQuestionSerializer, CreateQuestionSerializer


class CreateQuestion(CreateAPIView):
    """
    post:
    Creates and returns a new question.

    The difficulty option are: 'E' for Easy, 'I' for Intermediate and 'H' for Hard

    The points values will be automatically define depending on the difficulty level of the question

    Program receives the id of the program (bootcamp) inside a list (a question can be in several programs)
    """

    serializer_class = CreateQuestionSerializer

    def perform_create(self, serializer):
        serializer.save(question_creator=self.request.user)
        return serializer


class RetrieveUpdateDestroyQuestion(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a question with the given id.
    patch:
    Update a question with the given id.
    delete:
    Delete a question with the given id.
    """

    http_method_names = ['get', 'patch', 'delete']
    serializer_class = CreateQuestionSerializer
    queryset = Question.objects.all()
    lookup_field = 'id'


class RetrieveQuestionAsCandidate(RetrieveAPIView):
    """
    get:
    Retrieve a question with the given id.

    Candidates have permission.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CreateQuestionSerializer
    queryset = Question.objects.all()
    lookup_field = 'id'


class ListQuestions(ListAPIView):
    """
    get:
    Returns the list of all questions.

    Search can be made by name, instructions or difficulty.

    Candidates have permissions.
    """

    serializer_class = ListQuestionSerializer
    queryset = Question.objects.all()

    search_fields = ['name', 'instructions', 'difficulty']
    filter_backends = (filters.SearchFilter,)
