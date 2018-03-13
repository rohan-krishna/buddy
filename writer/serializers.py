from .models import Notebook, Note
from rest_framework import serializers

class NotebookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notebook
        fields = ('id','title','user','created_at','updated_at')


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id','title','body','user','notebook','created_at','updated_at')
