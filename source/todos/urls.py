
from django.urls import path
from . import views

urlpatterns = [
    path('', views.todos, name='todos'),
    path('delete/<todo_id>', views.delete, name='delete')
]
