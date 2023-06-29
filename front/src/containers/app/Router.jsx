import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

// <--- COMPONENTES  --->
import { Login } from "../pages/Authentication/Login";
import { Empresa } from "../pages/Empresas/Empresas";
import { FormEmpresa } from "../pages/Empresas/FormEmpresas";
import { Usuario } from "../pages/Funcionarios/Funcionario";
import { ProtectedRoutes } from "./PrivateRoute";

const rotasPrivadas = [
  {
    id: "empresa-route",
    title: "Rota Empresa",
    path: "/empresa",
    component: <Empresa />,
  },
  {
    id: "form-empresa-route",
    title: "Rota Empresa Form",
    path: "/form/empresa",
    component: <FormEmpresa />,
  },
  {
    id: "funcionarios-route",
    title: "Rota Funcionarios",
    path: "/funcionarios",
    component: <Usuario />,
  },
  {
    id: "linha-tempo-route",
    title: "Rota linha-tempo",
    path: "/linha/tempo",
    component: <div>Linha do Tempo</div>,
  },
];

const rotasPublicas = [
  {
    id: "root-route",
    title: "Root route",
    path: "/",
    component: <Login />
  },
  {
    id: "login-route",
    title: "Login Route",
    path: "/login",
    component: <Login />,
  },
];

export const Router = () => {
  const isAuth = useAuth();

  return (
    <main>
      <Routes>
        {/*  --------- ROTAS PUBLICAS ---------  */}

        {rotasPublicas.map((item, key) => (
          <Route key={item.id} path={item.path} element={!isAuth ? item.component : <Navigate to={"/empresa"}/>}/>
        ))}

        {/*  --------- ROTAS PRIVADAS ---------  */}

        <Route element={<ProtectedRoutes />}>
          {rotasPrivadas.map((item, key) => (
            <Route key={item.id} path={item.path} element={item.component} />
          ))}
          <Route path="*" element={<div>404 Page not Found</div>} />
        </Route>
      </Routes>
    </main>
  );
};
