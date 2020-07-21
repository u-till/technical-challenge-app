from django.urls import path
from challenge.views import *

urlpatterns = [
    path('list/', ListChallenges.as_view()),
    path('create/', CreateChallenge.as_view()),
    path('challenge/<int:id>/', RetrieveChallengeAsCandidate.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroyChallenge.as_view()),
    path('me/', ListUserChallengesView.as_view()),
    path('start/<int:id>/', StartChallenge.as_view()),
    path('score/<int:id>/', ChallengeScore.as_view()),
]
