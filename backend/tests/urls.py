from django.urls import path
from tests.views import *

urlpatterns = [
    path('1/', RunTestOne.as_view()),
    path('2/', RunTestTwo.as_view()),
    path('3/', RunTestThree.as_view()),
    path('4/', RunTestFour.as_view()),
    path('5/', RunTestFive.as_view()),
    path('6/', RunTestSix.as_view()),
    path('7/', RunTestSeven.as_view()),
    path('8/', RunTestEight.as_view()),
    path('9/', RunTestNine.as_view()),
    path('10/', RunTestTen.as_view()),
    path('getcode/', GetCandidateCodeView.as_view())
]
