from django.shortcuts import render, redirect
from .models import Todo
from .forms import TodoForm
from django.contrib import messages


def todos(request):
    if request.method == 'POST':
        form = TodoForm(request.POST or None)
        if form.is_valid():
            form.save()
            messages.success(request, ("Todo successful created"))

            return redirect('todos')

    if request.method == 'GET':
        all_todos = Todo.objects.all
        return render(request, 'todos/todos.html', {'all_todos': all_todos})
