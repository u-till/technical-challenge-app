from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from question.models import Question
from tip.models import Tip
from tip.serializers import TipSerializer


class CreateTipForQuestion(CreateAPIView):
    serializer_class = TipSerializer
    queryset = Tip.objects.all()
    lookup_field = 'question_id'
    permission_classes = [IsAdminUser]

    def create(self, request, question_id, **kwargs):
        question = Question.objects.get(id=question_id)
        tip = Tip(content=request.data['content'], discount_value=1, question=question)
        tip.save()
        return Response(status=200)


class ListTipByQuestion(ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = TipSerializer
    queryset = Tip.objects.all()
    lookup_field = 'question_id'

    def get_queryset(self, **kwargs):
        tips = Tip.objects.filter(question_id=self.kwargs['question_id'])
        return tips


class ListTipByID(RetrieveUpdateDestroyAPIView):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    lookup_field = 'id'

    def get_queryset(self, **kwargs):
        tip = Tip.objects.filter(id=self.kwargs['id'])
        return tip