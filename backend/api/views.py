# Libs
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

# Modules
from .serializers import EmpresaSerializer, FuncionarioSerializer
from .models import Empresa, Funcionario
from .utils import jwt_payload_handler, extract_jwt_token


@api_view(['GET'])
def getRoutes(request):
    routes = [
        # Authentication
        {
            "Auth": [
                {"token": "token"},
                {"Refresh-token": "token/refresh"},
            ],
        },
        # User Permission
        {
            "User-Permission": 'user/permission',
        },

        # CRUD - Funcionarios
        {
            "Funcionario": [
                {"GET Funcionarios": "/funcionarios"},
                {"GET Funcionario": "/funcionario/<str:pk>"},
                {"POST Empresa": "/funcionario"},
                {"UPDATE Funcionarios": "/update/funcionario/<str:pk>"},
                {"DELETE Funcionarios": "/delete/funcionario/<str:pk>"},
            ],
        },
        # CRUD - Empresas
        {
            "Empresa": [
                {"GET Empresas": "/empresas"},
                {"GET Empresa": "/empresa/<str:pk>"},
                {"POST Empresa": "/empresa"},
                {"UPDATE Empresa": "/update/empresa/<str:pk>"},
                {"DELETE Empresa": "/delete/empresa/<str:pk>"},
            ],
        },
    ]
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkUserPermission(request):
    user = request.user
    token = extract_jwt_token(request.headers['Authorization'])
    userToken = jwt_payload_handler(user, token)
    
    return Response(userToken)

# CRUD EMPRESA
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def empresaList(request):
   empresa = Empresa.objects.all()
   serializer = EmpresaSerializer(empresa, many=True)

   return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def empresaDetalhe(request, pk):
    empresa = Empresa.objects.get(id=pk)
    serializer = EmpresaSerializer(empresa, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createEmpresa(request):
    serializer = EmpresaSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def updateEmpresa(request, pk):
    empresa = Empresa.objects.get(id=pk)
    serializer = EmpresaSerializer(instance= empresa,data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteEmpresa(request, pk):
    empresa = Empresa.objects.get(id=pk)
    empresa.delete()

    return Response({'message':'Empresa deletada com sucesso', 'deleted': True})


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

# CRUD FUNCIONARIO

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def funcionarioList(request):
    funcionario = Funcionario.objects.all()
    serializer = FuncionarioSerializer(funcionario, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def funcionarioDetalhe(request, pk):
    funcionario = Funcionario.objects.get(id=pk)
    serializer = FuncionarioSerializer(funcionario, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createFuncionario(request):
    print(request.data)
    serializer = FuncionarioSerializer(data=request.data)

    print(serializer.is_valid())
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def updateFuncionario(request, pk):
    funcionario = Funcionario.objects.get(id=pk)
    serializer = FuncionarioSerializer(instance= funcionario ,data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteFuncionario(request, pk):
    funcionario = Funcionario.objects.get(id=pk)
    funcionario.delete()

    return Response({'message':'Funcionario deletado com sucesso', 'deleted': True})


