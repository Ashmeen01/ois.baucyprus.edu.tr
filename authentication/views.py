from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login, logout
from django.urls import reverse
from django.contrib.auth.decorators import login_required


# Login View
def login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return JsonResponse(
                {
                    "message": "Login successful",
                    "redirect_url": reverse("core:verify"),
                },
                status=200,
            )
        else:
            return JsonResponse({"message": "Invalid username or password"}, status=401)

    if request.headers.get("X-Requested-With") == "XMLHttpRequest":
        return JsonResponse({"message": "Method not allowed"}, status=405)

    return render(request, "pages/login.html")


# Profile View (Only Logged-in User Can See Their Data)
@login_required
def index(request):
    return render(request, "contents/index.html", {"user": request.user})
