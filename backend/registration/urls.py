from django.urls import path

from registration.views import RegistrationEmail, RegistrationValidation

urlpatterns = [
    path('', RegistrationEmail.as_view()),
    path('validation/', RegistrationValidation.as_view())
]