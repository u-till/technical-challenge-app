from django.urls import path

from user.views import ListUsers, RetrieveUpdateDestroyUser, Me

urlpatterns = [
    path('', ListUsers.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroyUser.as_view()),
    path('me/', Me.as_view()),
]
