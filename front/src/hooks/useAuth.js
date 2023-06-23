import { JWT } from "../utils/constants";

const useAuth = () => {
    const user = localStorage.getItem(JWT);
    const isLoggedIn = user ? true : false;
    return isLoggedIn;
};

export { useAuth };