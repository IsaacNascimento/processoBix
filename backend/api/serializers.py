from rest_framework import serializers
from .models import Empresa, Funcionario

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class FuncionarioSerializer(serializers.ModelSerializer):
    # empresa_name = serializers.CharField(source='category.name')
    class Meta:
        model = Funcionario
        fields = '__all__'