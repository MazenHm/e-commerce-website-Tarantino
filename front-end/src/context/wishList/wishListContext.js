import { createContext , useContext } from "react";

export const wishListContext = createContext();

export const useWishList = () =>{
    return useContext(wishListContext);
}