from django.shortcuts import render, redirect, HttpResponse
from .models import Todo
from .forms import TodoForm
from django.contrib import messages


def todos(request):
    if request.method == 'POST':
        print(request.body)
        form = TodoForm(request.POST or None)
        if form.is_valid():
            form.save()
            messages.success(request, ("Todo successful created"))
            return redirect('todos')
        else:
            messages.error(request, ("Please provide all information"))
            return redirect('todos')

    if request.method == 'GET':
        all_todos = Todo.objects.all
        return render(request, 'todos/todos.html', {'all_todos': all_todos})

def delete(request, todo_id):
    todo = Todo.objects.get(pk=todo_id)
    todo.delete()
    messages.success(request, (f'{todo.title} has been deleted'))
    return redirect('todos')
    

def isComplete(request, todo_id):
    todo = Todo.objects.get(pk=todo_id)
    # todo.isComplete ? todo.isComplete = False : todo.isComplete = True
    if (todo.isComplete):
        todo.isComplete = False
        messages.success(request, (f'{todo.title} has been marked not complete'))
    else:
        todo.isComplete = True
        messages.success(request, (f'{todo.title} has been marked complete'))
    
    todo.save()

    return redirect('todos')
