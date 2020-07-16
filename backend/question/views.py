from rest_framework import filters
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from question.models import Question
from question.serializers import QuestionSerializer


class CreateQuestion(CreateAPIView):
    """
    post:
    Creates and returns a new question.

    The difficulty option are: 'E' for Easy, 'I' for Intermediate and 'H' for Hard

    The points values will be automatically define depending on the difficulty level of the question

    Program receives the id of the program (bootcamp) inside a list (a question can be in several programs)
    """

    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        if self.request.data['difficulty'] == 'E':
            points_value = 3
        elif self.request.data['difficulty'] == 'I':
            points_value = 7
        else:
            points_value = 10
        serializer.save(question_creator=self.request.user, points_value=points_value)
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

    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    lookup_field = 'id'


class ListQuestions(ListAPIView):
    """
    get:
    Returns the list of all questions.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

    search_fields = ['name', 'instructions', 'difficulty']
    filter_backends = (filters.SearchFilter,)




