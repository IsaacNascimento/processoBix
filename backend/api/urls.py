from django.urls import path

from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # base
    path("", views.getRoutes, name="getRoutes"),

    # Auth
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Check User Permission 
    path('user/permission', views.checkUserPermission, name='checkUserPermission'),

    # CRUD Empresas
    path("empresas", views.empresaList, name="empresaList"),
    path("empresa/<str:pk>", views.empresaDetalhe, name="empresaDetalhe"),
    path("empresa", views.createEmpresa, name="createEmpresa"),
    path("update/empresa/<str:pk>", views.updateEmpresa, name="updateEmpresa"),
    path("delete/empresa/<str:pk>", views.deleteEmpresa, name="deleteEmpresa"),

    # CRUD Funcionarios
    path("funcionarios", views.funcionarioList, name="funcionarioList"),
    path("funcionario/<str:pk>", views.funcionarioDetalhe, name="funcionarioDetalhe"),
    path("funcionario", views.createFuncionario, name="createFuncionario"),
    path("update/funcionario/<str:pk>", views.updateFuncionario, name="updateFuncionario"),
    path("delete/funcionario/<str:pk>", views.deleteFuncionario, name="deleteFuncionario"),
]