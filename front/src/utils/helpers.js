export const getToken = () => {
  const usuario = JSON.parse(localStorage.getItem("BixDashboard"));

  if (usuario) {
    return usuario.token;
  } else {
    return "";
  }
};
