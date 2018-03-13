from django.contrib import admin
from .models import Notebook, Note
# Register your models here.
class NoteInline(admin.TabularInline):
    model = Note

@admin.register(Notebook)
class NotebookAdmin(admin.ModelAdmin):
    inlines=[
        NoteInline
    ]

