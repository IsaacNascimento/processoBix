import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

// <--- COMPONENTES  --->
import { Login } from "../pages/Authentication/Login";
import { Exemplo } from "../pages/Exemplo/Exemplo";
import { Usuario } from "../pages/Usuarios/Usuario";
import { ProtectedRoutes } from "./PrivateRoute";

const rotasPrivadas = [
  {
    id: "exemplo-route",
    title: "Rota Exemplo",
    path: "/exemplo",
    component: <Exemplo />,
  },
  {
    id: "usuarios-route",
    title: "Rota Usuarios",
    path: "/usuarios",
    component: <Usuario />,
  },
  {
    id: "novo-usuario-route",
    title: "Rota Novo usuario",
    path: "/novo-usuario",
    component: <div>Novo usuário</div>,
  },
  {
    id: "produtos-route",
    title: "Rota Produtos",
    path: "/produtos",
    component: <div>Produtos</div>,
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
          element={!isAuth ? <Login /> : <Navigate to={"/exemplo"} />}
        />
        <Route
          exact
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to={"/exemplo"} />}
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
