from django.shortcuts import render, redirect
from .models import Member
from .forms import MemberForm
from django.contrib import messages


def home(request):
    all_members = Member.objects.all
    return render(request, 'home.html', {'all_members': all_members})


def join(request):
    if request.method == "POST":
        form = MemberForm(request.POST or None)
        if form.is_valid():
            form.save()
            messages.success(
                request, ('You are succeful added to membership!'))

            return redirect('home')
    else:
        return render(request, 'join.html', {})
