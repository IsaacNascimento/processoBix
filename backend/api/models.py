from django.db import models

# Create your models here.

class Empresa(models.Model):
    nome = models.CharField(max_length=200)
    cnpj = models.CharField(max_length=25)
    endereco = models.CharField(max_length=50)
    cep = models.CharField(max_length=10)
    telefone = models.CharField(max_length=20)
    email = models.EmailField(max_length=200)
    data_criacao = models.DateField(auto_now_add=True)
    area = models.CharField(max_length=150)

    def __str__(self):
        return self.nome


class Funcionario(models.Model):
    nome = models.CharField(max_length=200)
    cpf = models.CharField(max_length=15)
    endereco = models.CharField(max_length=50)
    telefone = models.CharField(max_length=20)
    email = models.EmailField(max_length=200)
    empresa = models.ForeignKey(Empresa, null=True, blank=True, on_delete=models.SET_NULL, related_name="funcionarios")
    cargo = models.CharField(max_length=50)
    data_admissao = models.DateField(auto_now_add=True)
    data_demissao = models.CharField(max_length=12, null=True, blank=True)
    
    def __str__(self):
        return self.nome
    
class Ferias(models.Model):
    funcionario = models.ForeignKey(Funcionario, null=True, blank=True, on_delete=models.SET_NULL, related_name="ferias")
    data_incio = models.CharField(max_length=20)
    data_final = models.CharField(max_length=20)
    periodo = models.CharField(max_length=2)
