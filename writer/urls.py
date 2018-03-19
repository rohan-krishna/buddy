from django.urls import path, include
from . import views

from rest_framework.urlpatterns import format_suffix_patterns

app_name = 'writer'

urlpatterns = [
    path('', views.index, name='index'),
    path('api-root', views.api_root, name='api-root'),
    path('notebooks/', views.NotebookList.as_view(), name='notebook-list'),
    path('notebooks/<int:pk>', views.NotebookDetail.as_view(), name='notebook-detail'),
    path('notes/', views.NoteList.as_view(), name='note-list'),
    path('notes/<int:pk>', views.NoteDetail.as_view(), name='note-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)