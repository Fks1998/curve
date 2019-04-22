"""curve URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.urls import path, re_path, include
from django.conf.urls.static import static
from curve import settings

from curve.views import IndexView
from authentication.views import LoginView, LogoutView, RegisterView

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^api/v1/dining/', include('dining.urls')),
    re_path(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    re_path(r'^api/v1/auth/register/$', RegisterView.as_view(), name='register'),
    re_path(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    re_path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'.*', IndexView.as_view(), name='index'),
]
