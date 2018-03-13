from django.urls import path, include
from . import views

app_name = 'writer'

urlpatterns = [
    path('', views.index, name='index'),
    path('notebooks/', views.getallnotebooks, name='notebooks')
]