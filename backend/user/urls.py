from django.urls import path

from user.views import ListUsers

urlpatterns = [
    path('', ListUsers.as_view()),
]
