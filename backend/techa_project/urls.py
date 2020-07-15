"""techa_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/docs/', include_docs_urls(title='Technical Challenge API', public=True, permission_classes=[])),
    path('api/users/', include('user.urls')),
    path('api/questions/', include('question.urls')),
    path('api/challenges/', include('challenge.urls')),
    path('api/tips/', include('tip.urls')),
    path('api/programs/', include('program.urls')),
    path('api/auth/token/', jwt_views.TokenObtainPairView.as_view()),
    path('api/auth/token/refresh/', jwt_views.TokenRefreshView.as_view()),
    path('api/auth/token/verify/', jwt_views.TokenVerifyView.as_view()),
]
