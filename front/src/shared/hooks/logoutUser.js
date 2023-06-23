import TokenService from "../../utils/api/base/tokenServicer";
import { USERNAME } from "../../utils/constants";

const removeItems = () => {
  TokenService.removeUser();
  localStorage.removeItem(USERNAME);
};

export const reloadPage = () => window.location.reload();

const LogoutUser = (isControllByUser) => {
  removeItems();
  if (!isControllByUser) {
    reloadPage();
  }
};

export default LogoutUser;
