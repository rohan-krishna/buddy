from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response

from .models import Notebook, Note
from .serializers import NotebookSerializer, NoteSerializer


class NotebookViewSet(viewsets.ModelViewSet):
    queryset = Notebook.objects.all().order_by('-created_at')
    serializer_class = NotebookSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('-created_at')
    serializer_class = NoteSerializer


# Create your views here.
def index(request):
    return render(request, 'writer/index.html', {})

@login_required
@api_view(['GET'])
def getallnotebooks(request):
    notebooks = request.user.notebook_set.all()
    serializer = NotebookSerializer(notebooks, many=True)
    return Response(serializer.data)

@login_required
@api_view(['GET'])
def getallnotes(request):
    notes = request.user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
    


