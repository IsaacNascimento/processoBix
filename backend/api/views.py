# Libs
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

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
                {"token": "login"},
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
    try:
        userToken = jwt_payload_handler(user, token)
    except:
        return Response({"Error": "Requisição não encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    return Response(userToken)

# CRUD EMPRESA
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def empresaList(request):
    try:
        empresa = Empresa.objects.all()
    except:
        return Response({"Error": "Requisição não encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = EmpresaSerializer(empresa, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def empresaDetalhe(request, pk):
    try:
        empresa = Empresa.objects.get(id=pk)
    except:
        return Response({"Error": "Empresa não encontrada"}, status=status.HTTP_404_NOT_FOUND)

    serializer = EmpresaSerializer(empresa, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createEmpresa(request):
    serializer = EmpresaSerializer(data=request.data)

    if not serializer.is_valid(raise_exception=False):
            return Response({"Error": "Error ao criar empresa"}, status=status.HTTP_400_BAD_REQUEST)
    
    if serializer.is_valid():
        serializer.save()

    return Response({
        "data": serializer.data, 
       }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def updateEmpresa(request, pk):
    try:
        empresa = Empresa.objects.get(id=pk)
    except:
        return Response({"Error": "Empresa não encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = EmpresaSerializer(instance= empresa,data=request.data)

    if not serializer.is_valid(raise_exception=False):
            return Response({"Error": "Error ao atualizar empresa"}, status=status.HTTP_400_BAD_REQUEST)
    
    if serializer.is_valid():
        serializer.save()

    return Response({"Message": "Item atualizado com sucesso"},status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteEmpresa(request, pk):
    try:
        empresa = Empresa.objects.get(id=pk)
    except:
        return Response({"Error": "Empresa não encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    empresa.delete()

    return Response({'message':'Empresa deletada com sucesso', 'deleted': True}, status=status.HTTP_204_NO_CONTENT)


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

# CRUD FUNCIONARIO

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def funcionarioList(request):
    try:
        funcionario = Funcionario.objects.all()
    except:
        return Response({"Error": "Requisição não encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = FuncionarioSerializer(funcionario, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def funcionarioDetalhe(request, pk):
    try:
        funcionario = Funcionario.objects.get(id=pk)
    except:
        return Response({"Error": "Funcionário não encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = FuncionarioSerializer(funcionario, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createFuncionario(request):
    serializer = FuncionarioSerializer(data=request.data)

    print(serializer.is_valid())

    if not serializer.is_valid(raise_exception=False):
            return Response({"Error": "Error ao criar Funcionário"}, status=status.HTTP_400_BAD_REQUEST)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def updateFuncionario(request, pk):
    try:
        funcionario = Funcionario.objects.get(id=pk)
    except:
        return Response({"Error": "Funcionário não encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = FuncionarioSerializer(instance= funcionario ,data=request.data)

    if not serializer.is_valid(raise_exception=False):
            return Response({"Error": "Error ao atualizar funcionário"}, status=status.HTTP_400_BAD_REQUEST)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response({"Message": "Item atualizado com sucesso"},status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteFuncionario(request, pk):
    try:
        funcionario = Funcionario.objects.get(id=pk)
    except:
        return Response({"Error": "Funcionário não encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
    funcionario.delete()

    return Response({'message':'Funcionário deletado com sucesso', 'deleted': True}, status=status.HTTP_204_NO_CONTENT)


