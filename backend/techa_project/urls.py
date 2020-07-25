from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt import views as jwt_views

documented_urls = [
    path('backend/api/admin/', admin.site.urls),
    path('backend/api/users/', include('user.urls')),
    path('backend/api/questions/', include('question.urls')),
    path('backend/api/challenges/', include('challenge.urls')),
    path('backend/api/tips/', include('tip.urls')),
    path('backend/api/programs/', include('program.urls')),
    path('backend/api/auth/token/', jwt_views.TokenObtainPairView.as_view()),
    path('backend/api/auth/token/refresh/', jwt_views.TokenRefreshView.as_view()),
    path('backend/api/auth/token/verify/', jwt_views.TokenVerifyView.as_view()),
]

urlpatterns = documented_urls + [
    path('backend/api/docs/', include_docs_urls(patterns=documented_urls, title='Technical Challenge API', public=True,
                                                permission_classes=[])),
    path('backend/api/tests/', include('tests.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
