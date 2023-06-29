import axiosInstance from "./base/axiosInstance";

export const funcionarioApi = {
  getFuncionario: async (id) => {
    let status;
    return await axiosInstance(`funcionario/${id}`, { method: "GET" })
      .then((response) => {
        if (response?.status === 200) {
          return {
            response: response,
            data: response?.data,
            status: response.status,
            message: response.statusText,
          };
        }

        const res = response?.response;
        status = res.status;
        return {
          res,
          status,
        };
      })
      .catch((reason) => {
        return {
          response: reason.response,
          status: status,
          message: reason?.message,
        };
      });
  },

  fetchAll: async () => {
    return await axiosInstance("funcionarios", { method: "GET" })
      .then((response) => {
        return {
          response: response,
          data: response?.data,
          status: response?.status,
          message: response?.statusText,
        };
      })
      .catch((reason) => {
        return {
          response: reason?.response,
          status: reason?.response?.status,
          message: reason?.response?.statusText,
        };
      });
  },

  createFuncionario: async (data) => {
    return await axiosInstance("/funcionario", { method: "POST", data: data })
      .then((response) => {
        console.log('response', response);
        return {
          response: response,
          data: response?.data,
          status: response?.status,
        };
      })
      .catch((error) => {
        console.log('Error');
        return {
          response: error?.response,
          status: error?.response?.status,
          message: error?.response?.statusText,
        };
      });
  },

  updateFuncionario: async (data) => {
    const { id } = data;

    let status;
    return await axiosInstance(`update/funcionario/${id}`, {
      method: "POST",
      data: data,
    })
      .then((response) => {
        if (response?.status === 202) {
          return {
            response,
            status: response?.status,
            data: response?.data,
          };
        }

        status = response.status;
        return {
          response,
          status: status,
          data: response.data,
        };
      })
      .catch((error) => {
        return {
          response: error?.response,
          status: error?.response.status,
          message: error?.response.statusText,
        };
      });
  },

  deleteFuncionario: async (id) => {
    let status;
    return await axiosInstance(`delete/funcionario/${id}`, { method: "DELETE" })
      .then((response) => {
        status = response.status;
        return {
          response: response,
          data: response?.data,
          status: response?.status,
        };
      })
      .catch((error) => {
        return {
          response: error.response,
          status: status,
          message: error?.message,
        };
      });
  },
};
