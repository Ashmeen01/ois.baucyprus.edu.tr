from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    # path("index/", views.index, name="index"),
    path("verify/", views.verify, name="verify"),
    path("location/", views.location, name="location"),
    path("upload/", views.upload_image, name="upload_image"),
    path("report/", views.view_images, name="report"),
]
