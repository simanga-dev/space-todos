from django.shortcuts import render
from .forms import UserRegisterForm
# from django.contrib.auth.forms import UserCreationForm


def accounts(request):
    form = UserRegisterForm()
    return render(request, 'accounts/accounts.html', {'form': form})
