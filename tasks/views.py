from django.shortcuts import render, redirect, get_object_or_404
from .models import Task
from django.http import HttpResponse
from django.db import transaction
from .forms import TaskEditForm
from django.utils import timezone

# Create your views here.
def index(request):
    tasks = Task.objects.all()
    todayTasks = Task.objects.filter(created_at__day=timezone.now().day)
    return render(request, 'tasks/index.html', { 'tasks' : tasks, 'todayTasks' : todayTasks })

def create(request):
    return render(request, 'tasks/create.html', {})

@transaction.atomic
def store(request):
    
    if request.method == 'POST':
        
        if 'is_completed' in request.POST:
            is_completed_var = True
        else:
            is_completed_var = False

        task = Task(
            title = request.POST['title'],
            description = request.POST['description'],
            user = request.user,
            is_completed = is_completed_var
        )

        task.save()
    

    return redirect("tasks:index")

def edit(request, task_id):
    
    task = get_object_or_404(Task, pk=task_id)
    form = TaskEditForm(instance=task)

    if request.user == task.user:
        return render(request, 'tasks/edit.html', { 'task' : task, 'form' : form })
    
    return HttpResponse("You do not have permission to edit this page!")

@transaction.atomic
def update(request, task_id):
    
    task = Task.objects.get(pk=task_id)
    form = TaskEditForm(request.POST, instance=task)

    if form.is_valid():
        form.save()
    else:
        return render(request, 'tasks/edit.html', { 'task' : task, 'form' : form })
    
    return redirect('tasks:index')