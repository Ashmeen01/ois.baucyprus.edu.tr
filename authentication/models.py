from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    full_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50, unique=True, blank=False, null=False)
    email = models.EmailField(max_length=50, unique=True, blank=False, null=False)
    password = models.CharField(max_length=100)
    profile = models.ImageField(upload_to="uploads/profiles/")
    result = models.ImageField(upload_to="uploads/results/")

    # USERNAME_FIELD = "email"
    # REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.full_name
