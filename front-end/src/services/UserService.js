import { Api } from "./config";

export const createUser = async (payload) => {
  console.log(payload);
  const response = {
    data: null,
    err: null,
  };
  await Api.post("/register", payload)
    .then((res) => {
      response.data = res;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};

export const updateUser = async (payload) => {
  console.log(payload);
  const response = {
    data: null,
    err: null,
  };
  await Api.put("/user/"+payload.id, payload.body)
    .then((res) => {
      response.data = res;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};

export const authenticate = async (payload) => {
  const response = {
    data: null,
    err: null,
  };
  await Api.post("/login", payload)
    .then((res) => {
      response.data = res.data;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};

export const getConnectedUser = async (token = null) => {
  const response = {
    data: null,
    err: null,
  };
  await Api.get("/me",{headers:{"x-auth": token || getSession()}})
    .then((res) => {
      response.data = res.data;
    })
    .catch((err) => {
      response.err = err;
    });

  return response;
};

export const storeToken = (token) => {
  localStorage.setItem("connect", token);
};

export const getSession = () => {
  return localStorage.getItem("connect");
};


export const logOut = () => {
  localStorage.removeItem("connect");
  console.log("Logged out successfully!"); // Add this line for debugging
};
