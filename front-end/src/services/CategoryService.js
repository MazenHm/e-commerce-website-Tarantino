import { Api } from "./config";

export const getAllCategory = async () => {
  let response = await Api.get("/getAllCategory");

  if (response.data) {
    return response.data;
  }
  return null;
};
