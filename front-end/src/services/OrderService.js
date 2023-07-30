import { Api } from "./config";

export const addOrder = async (payload) => {
  let response = await Api.post("/addOrder", payload);
  if (response.data) {
    return response.data;
  }
  return null;
};
