
from django.urls import path
import . from views

urlpatterns = [
    path('', view.home, name='home'),
]