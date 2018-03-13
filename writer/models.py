from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class Notebook(models.Model):
    title = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Note(models.Model):
    title = models.CharField(max_length=255, null=True)
    body = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notebook = models.ForeignKey(Notebook, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

