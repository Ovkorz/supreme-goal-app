# Generated by Django 4.0.5 on 2023-01-20 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='goal',
            name='description',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]