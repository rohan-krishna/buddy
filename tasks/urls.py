from django.urls import path
from . import views

app_name = 'tasks'

urlpatterns = [
    path('', views.index, name='index'),
    path('add-new-task/', views.create, name='create'),
    path('store/', views.store, name='store'),
    path('edit/<int:task_id>', views.edit, name='edit'),
    path('update/<int:task_id>', views.update, name='update'),
]