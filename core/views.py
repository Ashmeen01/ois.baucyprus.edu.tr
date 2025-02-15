from django.shortcuts import render, redirect
from .models import UploadedImage
from .forms import UploadedImageForm


# index views
# @login_required
# def index(request):
#     return render(request, "contents/index.html", {"user": request.user})


def verify(request):
    return render(request, "pages/verify.html")


def location(request):
    return render(request, "pages/location.html")


def upload_image(request):
    pass


def view_images(request):
    images = UploadedImage.objects.all()
    return render(request, "pages/result.html", {"images": images})
