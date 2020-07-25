from django.urls import path
from tip.views import *

urlpatterns = [
    path('create/<int:question_id>/', CreateTipForQuestion.as_view()),
    path('list/<int:question_id>/', ListTipByQuestion.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroyTipByID.as_view()),
    path('tip/<int:id>/', RetrieveTipAsCandidate.as_view()),
]
