# Generated by Django 5.0 on 2024-01-08 10:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ottapp', '0004_delete_profilenew'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdultProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profilename', models.CharField(max_length=255)),
                ('pin', models.CharField(max_length=4)),
                ('avatar', models.ImageField(upload_to='adult_avatars/')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.customer')),
            ],
        ),
        migrations.CreateModel(
            name='KidProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profilename', models.CharField(max_length=255)),
                ('avatar', models.ImageField(upload_to='kid_avatars/')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.customer')),
            ],
        ),
    ]
