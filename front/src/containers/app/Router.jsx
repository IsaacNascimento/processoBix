import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

// <--- COMPONENTES  --->
import { Login } from "../pages/Authentication/Login";
import { Exemplo } from "../pages/Empresas/Empresas";
import { Usuario } from "../pages/Usuarios/Usuario";
import { ProtectedRoutes } from "./PrivateRoute";

const rotasPrivadas = [
  {
    id: "empresa-route",
    title: "Rota Empresa",
    path: "/empresa",
    component: <Exemplo />,
  },
  {
    id: "usuarios-route",
    title: "Rota Usuarios",
    path: "/usuarios",
    component: <Usuario />,
  },
  {
    id: "linha-tempo-route",
    title: "Rota linha-tempo",
    path: "/linha/tempo",
    component: <div>Linha do Tempo</div>,
  },
];

export const Router = () => {
  const isAuth = useAuth();

  return (
    <main>
      <Routes>
        {/*  --------- ROTAS PUBLICAS ---------  */}

        <Route
          exact
          path="/"
          element={!isAuth ? <Login /> : <Navigate to={"/empresa"} />}
        />
        <Route
          exact
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to={"/empresa"} />}
        />

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
