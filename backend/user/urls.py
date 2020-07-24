from django.urls import path
from user.views import *

urlpatterns = [
    path('list/', ListUsersView.as_view()),
    path('create/', CreateUserView.as_view()),
    path('validation/<int:id>/', ValidateUserView.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroySpecificUserView.as_view()),
    path('me/', RetrieveUpdateDestroyLoggedInUserView.as_view()),
    path('resend/create/<int:id>/', ResendUserValidationEmail.as_view()),
    path('password/reset/code/', CreatePasswordResetRequestView.as_view()),
    path('password/reset/validation/', ValidatePasswordResetRequestView.as_view()),

]
