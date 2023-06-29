from django.contrib import admin

# Register your models here.
from .models import Empresa, Funcionario, Ferias
admin.site.register(Empresa)
admin.site.register(Funcionario)
admin.site.register(Ferias)