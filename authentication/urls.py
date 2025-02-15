from django.urls import path
from . import views


app_name = "auth"


urlpatterns = [
    path("", views.login, name="login"),
    path("index/", views.index, name="index"),
]
