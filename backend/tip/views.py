from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from question.models import Question
from tip.models import Tip
from tip.serializers import TipSerializer


class CreateTipForQuestion(CreateAPIView):
    """
    post:
    Creates and returns a new Tip.
    Discount_value is a number (float) that will be subtracted from the question total value.
    """
    serializer_class = TipSerializer
    queryset = Question
    lookup_url_kwarg = 'question_id'

    def create(self, request, *args, **kwargs):
        question = self.get_object()
        tip = Tip.objects.create(content=request.data['content'], discount_value=1, question=question)
        serializer = self.get_serializer(tip)
        return Response(serializer.data, status=200)


class ListTipByQuestion(ListAPIView):
    """
    get:
    Returns a list of all Tips for a given Question.
    Candidates have permission.
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
    Retrieve a Tip with the given id.
    patch:
    Update a Tip with the given id.
    delete:
    Delete a Tip with the given id.
    """
    http_method_names = ['get', 'patch', 'delete']
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    lookup_field = 'id'

    def get_queryset(self, **kwargs):
        tip = Tip.objects.filter(id=self.kwargs['id'])
        return tip


class RetrieveTipAsCandidate(RetrieveAPIView):
    """
     get:
     Retrieve a Tip with the given id.
     Candidates have permission.
     """

    permission_classes = [IsAuthenticated]
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    lookup_field = 'id'
