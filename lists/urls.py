from django.conf.urls import url, include
from rest_framework import routers
from . import views

urlpatterns = [
  url(r'^list/$', views.CurrentGroceriesViewSet.as_view()),
  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]