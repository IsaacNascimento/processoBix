# Generated by Django 3.2.12 on 2023-06-29 04:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='funcionario',
            name='ativo',
        ),
        migrations.RemoveField(
            model_name='funcionario',
            name='cep',
        ),
        migrations.RemoveField(
            model_name='funcionario',
            name='matricula',
        ),
    ]