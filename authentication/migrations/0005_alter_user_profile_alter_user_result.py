# Generated by Django 5.0.7 on 2025-02-15 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile',
            field=models.ImageField(upload_to='uploads/index'),
        ),
        migrations.AlterField(
            model_name='user',
            name='result',
            field=models.ImageField(upload_to='uploads/result'),
        ),
    ]
