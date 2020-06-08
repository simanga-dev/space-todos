
from django.urls import path
from . import views

urlpatterns = [
    path('', views.todos, name='todos'),
    path('delete/<todo_id>', views.delete, name='delete'),
    path('is-complete/<todo_id>', views.isComplete, name='isComplete'),
    path('edit-todos/<todo_id>', views.editTodo, name='editTodo')
]
