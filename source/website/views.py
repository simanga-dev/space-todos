from django.shortcuts import render


def home(request):
    return render(request, 'website/home.html')


def about(request):
    return render(request, 'aboutPage.html')
