from django.urls import path

from challenge.views import CreateChallenge, RetrieveUpdateDestroyChallenge, ListChallenges

urlpatterns = [
    path('list/', ListChallenges.as_view()),
    path('create/', CreateChallenge.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroyChallenge.as_view()),
]
