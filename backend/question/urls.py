from django.urls import path

from question.views import CreateQuestion, ListQuestions, RetrieveUpdateDestroyQuestion

urlpatterns = [
    path('create/', CreateQuestion.as_view()),
    path('list/', ListQuestions.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroyQuestion.as_view()),
]