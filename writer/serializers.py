from .models import Notebook, Note
from rest_framework import serializers

class NotebookSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notebook
        fields = ('id','title','created_at','updated_at', 'notes')
        depth = 1


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id','title','body','user','notebook','created_at','updated_at')
