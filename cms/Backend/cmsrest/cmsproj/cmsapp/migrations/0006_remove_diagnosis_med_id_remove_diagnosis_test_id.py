# Generated by Django 5.0.2 on 2024-02-11 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cmsapp', '0005_remove_medicine_quantity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='diagnosis',
            name='med_id',
        ),
        migrations.RemoveField(
            model_name='diagnosis',
            name='test_id',
        ),
    ]
