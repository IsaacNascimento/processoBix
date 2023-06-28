import axiosInstance from "./base/axiosInstance";

export const empresaApi = {
  getEmpresa: async (id) => {
    let status;
    return await axiosInstance(`empresa/${id}`, { method: "GET" })
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
    return await axiosInstance("empresas", { method: "GET" })
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

  createEmpresa: async (data) => {
    return await axiosInstance("exemplos/novo", { method: "POST", data: data })
      .then((response) => {
        return {
          response: response,
          data: response?.data,
          status: response?.status,
        };
      })
      .catch((error) => {
        return {
          response: error?.response,
          status: error?.response?.status,
          message: error?.response?.statusText,
        };
      });
  },

  updateEmpresa: async (data) => {
    const { id } = data;
    let status;
    return await axiosInstance(`exemplos/alterar/${id}`, {
      method: "PUT",
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

        const res = response?.response;
        status = res.status;
        return {
          response,
          status: status,
          data: res?.data?.detail,
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

  deleteEmpresa: async (id) => {
    let status;
    return await axiosInstance(`exemplos/deletar/${id}`, { method: "DELETE" })
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
