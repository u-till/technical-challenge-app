from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAdminUser

from question.serializers import QuestionSerializer


class CreateQuestion(CreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        if self.request.data['difficulty'] == 'E':
            points_value = 3
        elif self.request.data['difficulty'] == 'I':
            points_value = 7
        else:
            points_value = 10
        serializer.save(question_creator=self.request.user, points_value=points_value)
        return serializer
