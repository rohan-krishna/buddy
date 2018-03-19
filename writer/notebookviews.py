from rest_framework import viewsets, status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import permissions
from rest_framework.reverse import reverse

from .models import Notebook, Note
from .serializers import NotebookSerializer
from .permissions import IsOwnerOrDeny


class NotebookList(APIView):

    permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny)

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

    permission_classes = (permissions.IsAuthenticated, IsOwnerOrDeny)

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
