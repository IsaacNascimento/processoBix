import TokenService from "../../utils/api/base/tokenServicer";

const useAuth = () => {
  const user = TokenService.getSession();
  // const isLoggedIn = user ? true : false;
  return true;
};

export { useAuth };
