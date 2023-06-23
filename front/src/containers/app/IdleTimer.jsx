import React, { useEffect, useState } from "react";
import { useAuth } from "../../shared/hooks/useAuth";
import { LogoutModal } from "../../shared/components/LogoutModal";
import { publicPaths, oneMinute } from "../../utils/constants";

const activityEvents = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "click",
  "load",
];

// Componente que desconecta o usuario por inatividade
export const SessionTimeout = ({ children, ...args }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useAuth();
  const timeToRender = oneMinute * 10; // 10 minutos
  let time;

  // Funcao logout checa se o usuario está autenticado
  // E se as atuais rotas não são públicas;
  // Se entrar no if ele abre o modal de logout;
  const logoutUser = () => {
    if (isAuth && !publicPaths) {
      setIsOpen(true);
    }
    return null;
  };

  // Função está sendo executado a cada renderização do componente;
  // Limpa o tempo e reinicia um timeout, que se for executado chama o logout;
  const resetTimer = () => {
    clearTimeout(time);
    time = setTimeout(logoutUser, timeToRender);
  };

  // Escuta se o usuário está fazendo alguma interação com o sistema
  // Se escutar alguma interação, ele chama a função de resetar o tempo;
  activityEvents.forEach((event) => {
    document.addEventListener(event, resetTimer);
  });

  useEffect(() => {
    resetTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <>
      <LogoutModal
        id="modal-confirm-logout"
        isOpen={isOpen}
      />
      {children}
    </>
  );
};
