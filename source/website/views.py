from django.shortcuts import render
from .models import Member


def home(request):
    all_members = Member.objects.all
    return render(request, 'home.html', {'all_members': all_members})


def join(request):
    return render(request, 'join.html', {})
