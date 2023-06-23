import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../redux/actions/authActions";
import { useEffect } from "react";
import { USERNAME } from "../../../../utils/constants";

export const LoginForm = () => {
  const formLogin = document.getElementById("form-login");
  const btnLogin = document.getElementById("btn-login-submit");
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.login?.error);
  const isFetching = useSelector((store) => store.login?.isFetching);
  const isLoggin = useSelector((store) => store.login?.isLoggin);
  const token = useSelector((store) => store.login?.user?.access_token?.token);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const username = watch("username");
  const password = watch("password");

  const onSubmit = async () => {
    reset();
    await dispatch(login(username, password));
    localStorage.setItem(USERNAME, JSON.stringify(username));
  };

  // Se não houver error. Não estiver esperando resposta da api
  // Se estiver logado e houver o token... navegue o usuário para página privada;
  useEffect(() => {
    if (!error && !isFetching && isLoggin && token) {
      navigate("/exemplo");
    }
  }, [error, isFetching, isLoggin, navigate, token]);

  // Pressionar Enter para entrar;
  formLogin?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnLogin?.click();
    }
  });

  const handlePasswordTypeInput = () => setIsPassword((prev) => !prev);

  return (
    <React.Fragment>
      <form id="form-login" className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__form-group">
          <span className="form__form-group-label">Nome do Usuário</span>

          <input
            {...register("username", { required: true })}
            name="username"
            className="input-modal-form"
            placeholder="Digite o seu usuário"
            required
            disabled={isFetching}
            type={"text" || "email"}
          />
          {errors.username && (
            <span className="span-validation">
              O campo usuário é obrigatório
            </span>
          )}
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">Senha</span>
          <div className="form__form-group-field">
            <input
              {...register("password", { required: true })}
              name="password"
              className="input-modal-form"
              placeholder="Digite a sua senha"
              disabled={isFetching}
              required
              type={isPassword ? "password" : "text"}
            />
            <button
              onClick={handlePasswordTypeInput}
              type="button"
              disabled={isFetching}
              className="button-password"
            >
              {isPassword ? (
                <AiIcons.AiOutlineEye />
              ) : (
                <AiIcons.AiOutlineEyeInvisible />
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="container-span-validation">
            <span className="span-validation">{error}</span>
          </div>
        )}
        <button
          className="button-primary-confirm"
          id="btn-login-submit"
          onClick={handleSubmit}
          type="submit"
          disabled={isFetching}
        >
          {isFetching ? "Carregando..." : "Entrar"}
        </button>
      </form>
      <p className="acesso-restrito">Acesso Restrito</p>
    </React.Fragment>
  );
};
