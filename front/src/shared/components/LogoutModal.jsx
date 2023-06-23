import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import { logout } from "../../redux/actions/authActions";
import { publicPaths } from "../../utils/constants";
import { reloadPage } from "../hooks/logoutUser";

// Se chegar a abrir esse modal, o usuário foi desconectado
export const LogoutModal = ({ isOpen, ...args }) => {
  const dispatch = useDispatch();

  // Assim que o componente é invocado, ele checa se o modal está aberto,
  // Se estiver ele já exceuta uma função de logout do usuário;
  useEffect(() => {
    if (isOpen) {
        dispatch(logout(true));
    }
  }, [isOpen, dispatch]);

  return (
    <Modal isOpen={isOpen && !publicPaths}>
      <ModalBody>
        <div className="center-spinner-progress">
          Você foi desconectado por inatividade!
        </div>
        <hr />
        <div className="center-spinner-progress">
          <Button onClick={reloadPage} >Ok</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};
