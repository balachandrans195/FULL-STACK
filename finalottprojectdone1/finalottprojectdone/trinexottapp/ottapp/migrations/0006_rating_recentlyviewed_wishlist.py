# Generated by Django 5.0 on 2024-01-10 12:00

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ottapp', '0005_adultprofile_kidprofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField(default=0)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.customer')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.movie')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.adultprofile')),
            ],
        ),
        migrations.CreateModel(
            name='RecentlyViewed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.customer')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.movie')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.adultprofile')),
            ],
        ),
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('added_at', models.DateTimeField(default=datetime.datetime.now)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.customer')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.movie')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ottapp.adultprofile')),
            ],
        ),
    ]
