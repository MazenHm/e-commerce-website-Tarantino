import { Api } from "./config";

export const getLastProduct = async () => {
  let response = await Api.get("/getLastProducts");

  if (response.data) {
    return response.data;
  }
  return null;
};

export const getProductById= async (id) =>{
    let response = await Api.get(`/getProduct/${id}`);

    if (response.data) {
      return response.data;
    }
    return null;
} 

export const getAllProducts = async () => {
  let response = await Api.get("/getAllProducts");

  if (response.data) {
    return response.data;
  }
  return null;
};

export const getBestSellers = async () => {
  let response = await Api.get("/getBestSellers");

  if (response.data) {
    return response.data;
  }
  return null;
};