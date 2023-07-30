import { Api } from "./config";

export const getAllFrames = async () => {
  let response = await Api.get("/getAllFrames");
  if (response.data) {
    return response.data;
  }
  return null;
};
