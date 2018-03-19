from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.contrib.auth.models import User

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import permissions
from rest_framework.reverse import reverse

from .models import Notebook, Note
from .serializers import NotebookSerializer, NoteSerializer, UserSerializer
from .permissions import IsOwnerOrDeny

class NotebookList(APIView):
    
    permission_classes = (permissions.IsAuthenticated,IsOwnerOrDeny)
    
    def get(self, request, format=None):
        notebooks = request.user.notebooks.all()
        serializer = NotebookSerializer(notebooks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NotebookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NotebookDetail(APIView):
    
    permission_classes = (permissions.IsAuthenticated,IsOwnerOrDeny)

    def get_object(self, pk):
        try:
            return self.request.user.notebooks.get(pk=pk)
        except Notebook.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        notebook = self.get_object(pk)
        serializer = NotebookSerializer(notebook)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        notebook = self.get_object(pk)
        serializer = NotebookSerializer(notebook, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        notebook = self.get_object(pk)
        notebook.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NoteList(APIView):
    
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny)

    def get(self, request, format=None):
        notes = request.user.notes.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save({ 'user': self.request.user, 'notebook': self.request.data['notebook'] })


class NoteDetail(APIView):

    permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny)

    def get_object(self, pk):
        try:
            return self.request.user.notes.get(pk=pk)
        except Note.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        note = self.get_object(pk)
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        note = self.get_object(pk)

        data = {'body' : request.data['note'], 'user' : request.user.id, 'notebook' : request.data['notebook'] }

        serializer = NoteSerializer(note, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        note = self.get_object(pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(viewsets.ReadOnlyModelViewSet):    
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Create your views here.
@login_required
def index(request):
    return render(request, 'writer/index.html', {})

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'notebooks' : reverse('writer:notebook-list', request=request, format=format)
    })


