import { Api } from "./config";

export const validateCoupon = async (payload) => {
  let response = await Api.post("/coupons/validate",payload);

  if (response) {
    return response;
  }
  return null;
};
