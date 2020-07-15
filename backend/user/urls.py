from django.urls import path

from user.views import ListUsers, RetrieveUpdateDestroyUser, Me, CreateUser, UserValidation

urlpatterns = [
    path('', ListUsers.as_view()),
    path('create/', CreateUser.as_view()),
    path('validation/<int:id>/', UserValidation.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroyUser.as_view()),
    path('me/', Me.as_view()),
]
