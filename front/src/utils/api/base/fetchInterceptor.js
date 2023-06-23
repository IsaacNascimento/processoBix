import TokenService from "./tokenServicer";

const getMinutes = (item) => {
  console.log(item);
  const minutes = item?.substr(-8);
  return parseFloat(minutes);
};

const currentMinutes = () => {
  const now = new Date();
  return now.getMinutes();
};

let validateToken = async (authToken) => {
  console.log("Validate Token", authToken);
  // let data = await authApi.logado(authToken);
  return { data: {} };
};

const customFetcher = async () => {
  let authToken = TokenService.getToken();
  let token = authToken?.token;

  const expirationTime = currentMinutes() + getMinutes(authToken?.vida_token);

  const isExpired = expirationTime - 1 < currentMinutes();

  if (isExpired) {
    token = await validateToken(token);
  }

  let { data } = await validateToken(token);
  console.log("data: ", data);
  return { data };
};

export default customFetcher;
