from django.contrib import admin

# Register your models here.
from .models import Empresa, Funcionario
admin.site.register(Empresa)
admin.site.register(Funcionario)