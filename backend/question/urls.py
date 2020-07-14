from django.urls import path

from question.views import CreateQuestion
urlpatterns = [
    path('create/', CreateQuestion.as_view()),
]