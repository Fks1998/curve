from django.conf.urls import url
from django.urls import path, re_path
from dining.views import *

urlpatterns = [
    re_path(r'^fetch-points/$', fetchPoints.as_view()),
    re_path(r'^fetch-menu/$', fetchMenu.as_view()),
    re_path(r'^dining-status/$', todaysDiningStatus.as_view()),
    re_path(r'^add-dining/$', addDining.as_view()),
    re_path(r'^add-free-meal/$', FreeMealAtDining.as_view())
]
