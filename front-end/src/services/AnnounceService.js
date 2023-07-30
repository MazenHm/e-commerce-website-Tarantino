import { Api } from "./config";


export const getAllAnnounces = async () => {
    let response = await Api.get("/getAllAnnounces");
  
    if (response.data) {
      return response.data;
    }
    return null;
  };