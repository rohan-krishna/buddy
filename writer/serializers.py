from django.contrib.auth.models import User
from .models import Notebook, Note
from rest_framework import serializers

class NotebookSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notebook
        user = serializers.ReadOnlyField(source='user.username')
        fields = ('id','title','created_at','updated_at', 'notes','user')


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id','title','body','user','notebook','created_at','updated_at')

class UserSerializer(serializers.ModelSerializer):
    # notebooks = serializers.PrimaryKeyRelatedField(many=True, queryset=Notebook.objects.all())
    # notes     = serializers.PrimaryKeyRelatedField(many=True, queryset=Note.objects.all())

    class Meta:
        model = User
        fields = ('username','email')
        # depth = 1
