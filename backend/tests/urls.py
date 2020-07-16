from django.urls import path
from tests.views import RunTestOne

urlpatterns = [
    path('1/', RunTestOne.as_view()),
]
