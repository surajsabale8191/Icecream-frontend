from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def home(request):
    return render(request, "home.html")

def register(request):
    return render(request, "register.html")

def login(request):
    return render(request, "login.html")

def profile(request):
    return render(request, "profile.html")

def change_password(request):
    return render(request, "change_password.html")

def products(request):
    return render(request, "products.html")