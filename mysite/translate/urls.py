from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^get_translation/$', views.get_translation, name='get_translation'),
]