export const getToken = () => {
  const usuario = JSON.parse(localStorage.getItem("HeptaToken"));

  if (usuario) {
    return usuario.token;
  } else {
    return "";
  }
};
