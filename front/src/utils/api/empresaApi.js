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
    return await axiosInstance("/empresa", { method: "POST", data: data })
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

  updateEmpresa: async (data) => {
    const { id } = data;

    let status;
    return await axiosInstance(`update/empresa/${id}`, {
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

  deleteEmpresa: async (id) => {
    let status;
    return await axiosInstance(`delete/empresa/${id}`, { method: "DELETE" })
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
