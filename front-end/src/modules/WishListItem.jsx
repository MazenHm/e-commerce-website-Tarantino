import React from "react";
import { baseUrlImage } from "../services/config";
import { useWishList } from "../context/wishList/wishListContext";

const WishListItem = ({ item }) => {
  const wishList = useWishList();

  const handleRemoveItem = (e, el) => {
  e.preventDefault()
    wishList.removeItem(el);
 
  };

  const getProductPrice = (options) => {
    let product = options[0];

    options?.map((option) => {
      if (product.price > option.price) {
        product = option;
      }
    });

    return product.price;
  };
  return (
    <>
      <div className="cart-contaier">
        <div className="cart-basket d-flex align-items-center justify-content-between">
          <img src={item.image} alt="product" />
          <div className="d-flex flex-column gap-2">
            <div>
              <div>{item.name}</div>
            </div>
            <span className="minicart-price ">
              <span>TND{getProductPrice(item.option)}</span>
            </span>
          </div>
          <span
            className="lnr lnr-trash"
            onClick={(e) => handleRemoveItem(e , item)}
          ></span>
        </div>
      </div>
    </>
  );
};

export default WishListItem;
