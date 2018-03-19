from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from .notebookviews import NotebookList, NotebookDetail
from .noteapiview import NoteList, NoteDetail
from .userviews import UserViewSet

# Create your views here.
@login_required
def index(request):
    return render(request, 'writer/index.html', {})

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'notebooks' : reverse('writer:notebook-list', request=request, format=format)
    })


