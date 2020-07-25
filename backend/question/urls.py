from django.urls import path
from question.views import *

urlpatterns = [
    path('create/', CreateQuestion.as_view()),
    path('list/', ListQuestions.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroyQuestion.as_view()),
    path('question/<int:id>/', RetrieveQuestionAsCandidate.as_view()),
]
