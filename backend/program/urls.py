from django.urls import path

from program.views import ListPrograms, CreateProgram, RetrieveUpdateDestroyProgram

urlpatterns = [
    path('create/', CreateProgram.as_view()),
    path('list/', ListPrograms.as_view()),
    path('edit/<int:id>/', RetrieveUpdateDestroyProgram.as_view())
]
