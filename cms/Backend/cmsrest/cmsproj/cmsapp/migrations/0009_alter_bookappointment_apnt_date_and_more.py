# Generated by Django 5.0.2 on 2024-02-12 07:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsapp', '0008_alter_diagnosis_medicine_prefered_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookappointment',
            name='apnt_date',
            field=models.DateTimeField(unique=True),
        ),
        migrations.AlterField(
            model_name='medicine',
            name='exp_date',
            field=models.DateField(default=datetime.datetime(2024, 5, 12, 7, 33, 39, 731352, tzinfo=datetime.timezone.utc)),
        ),
    ]
