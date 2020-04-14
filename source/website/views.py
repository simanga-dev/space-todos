from django.shortcuts import render
from .models import Member
from .forms import MemberForm


def home(request):
    all_members = Member.objects.all
    return render(request, 'home.html', {'all_members': all_members})


def join(request):
    if request.method == "POST":
        form = MemberForm(request.POST or None)
        if form.is_valid():
            form.save()
            all_members = Member.objects.all
            return render(request, 'home.html', {'all_members': all_members})
    else:
        return render(request, 'join.html', {})
