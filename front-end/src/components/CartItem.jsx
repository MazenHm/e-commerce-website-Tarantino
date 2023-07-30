import React from "react";
import { useCart } from "../context/cart/cartContext";
import { baseUrlImage } from "../services/config";

const CartItem = ({ item }) => {
  const ecommerce = useCart();
  const handleDecreaseItem = (e) => {
    e.preventDefault();
    ecommerce.decreaseQty(item);
  };
  const handleIncreaseItem = (e) => {
    e.preventDefault();
    ecommerce.increaseQty(item);
  };
  const handleRemoveItem = (e) => {
    e.preventDefault();
    ecommerce.removeItem(item);
  };
  return (
    <>
      <div className="cart-contaier">
        <div className="cart-basket d-flex align-items-center justify-content-between">
          <img src={baseUrlImage + item.images[0].url} alt="product" />
          <div className="d-flex flex-column gap-2">
            <div>
              <div>{item.name}</div>
              <span className="d-block">{item.option.height}</span>
            </div>
            <span className="minicart-price ">
              <span>TND{item.option.price +(item.frame?.price ||0)}</span>
            </span>
            <div className="d-flex gap-3 ">
              <span
                className=" text-secondary border-none increase-decrease"
                onClick={(e) => handleDecreaseItem(e)}
              >
                -
              </span>
              <span>{item.qty}</span>
              <span
                className=" text-secondary border-none increase-decrease"
                onClick={(e) => handleIncreaseItem(e)}
              >
                +
              </span>
            </div>
          </div>
          <span
            className="lnr lnr-trash"
            onClick={(e) => handleRemoveItem(e)}
          ></span>
        </div>
      </div>
    </>
  );
};

export default CartItem;
