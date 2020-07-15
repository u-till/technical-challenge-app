from django.urls import path

from tip.views import CreateTipForQuestion, ListTipByQuestion, ListTipByID

urlpatterns = [
    path('create/<int:question_id>/', CreateTipForQuestion.as_view()),
    path('list/<int:question_id>/', ListTipByQuestion.as_view()),
    path('edit/<int:id>/', ListTipByID.as_view()),
]
