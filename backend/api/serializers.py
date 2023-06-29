from rest_framework import serializers
from .models import Empresa, Funcionario

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class FuncionarioSerializer(serializers.ModelSerializer):
    # empresa = EmpresaSerializer()
    empresa = serializers.SlugRelatedField(queryset=Empresa.objects.all(), slug_field='nome')
    
    class Meta:
        model = Funcionario
        fields = '__all__'