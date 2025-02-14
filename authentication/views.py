from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse
from .models import User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login


# login views
def login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = authenticate(request, email=email, password=password)
        if user is not None:
            auth_login(request, user)  # Use auth_login to avoid conflict
            messages.success(request, "Login successful")
            return JsonResponse(
                {"message": "Login successful", "redirect_url": reverse("core:verify")},
                status=200,
            )
        else:
            messages.error(request, "Invalid email or password")
            return JsonResponse({"message": "Invalid email or password"}, status=401)

    return render(request, "pages/login.html")


#
