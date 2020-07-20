from django.urls import path
from challenge.views import *

urlpatterns = [
    path('list/', ListChallenges.as_view()),
    path('create/', CreateChallenge.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroyChallenge.as_view()),
    path('me/', ListUserChangesView.as_view())
    path('start/<int:id>/', StartChallenge.as_view()),
]
