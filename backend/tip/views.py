from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from question.models import Question
from tip.models import Tip
from tip.serializers import TipSerializer


class CreateTipForQuestion(CreateAPIView):
    """
    post:
    Creates and returns a new tip.

    The discount_value it's a number (float) that will be subtracted from the question total value.
    """

    serializer_class = TipSerializer
    queryset = Tip.objects.all()
    lookup_field = 'question_id'

    def create(self, request, question_id, **kwargs):
        question = Question.objects.get(id=question_id)
        tip = Tip(content=request.data['content'], discount_value=1, question=question)
        tip.save()
        return Response(status=200)


class ListTipByQuestion(ListAPIView):
    """
    get:
    Returns the list of all tips in a given question.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = TipSerializer
    queryset = Tip.objects.all()
    lookup_field = 'question_id'

    def get_queryset(self, **kwargs):
        tips = Tip.objects.filter(question_id=self.kwargs['question_id'])
        return tips


class RetrieveUpdateDestroyTipByID(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a tip with the given id.
    patch:
    Update a tip with the given id.
    delete:
    Delete a tip with the given id.
    """

    http_method_names = ['get', 'patch', 'delete']

    permission_classes = [IsAuthenticated]
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    lookup_field = 'id'

    def get_queryset(self, **kwargs):
        tip = Tip.objects.filter(id=self.kwargs['id'])
        return tip
