import React, { useEffect, useState } from "react";
import { CartContext } from "./cartContext";

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [auto, setAuto] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  function toggel(close = false) {
    if (close) {
      setToggleCart(false);
    } else {
      setToggleCart(true);
    }
  }

  function addItem(cartItem) {
    let items = cartItems;
    let item = items.find((item) => item._id === cartItem._id && item.option._id == cartItem.option._id);
    console.log(item, cartItem);
    if (item) {
      let index = items.indexOf(item);
      items[index].qty += 1;
    } else {
      items.push(cartItem);
    }
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setAuto(!auto);
    toggel();
  }

  function removeItem(cartItem) {
    let items = cartItems;
    let item = items.find((item) => item._id === cartItem._id);
    let index = items.indexOf(item);

    items.splice(index, 1);

    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
    setAuto(!auto);
  }

  function increaseQty(cartItem) {
    let items = cartItems;
    let item = items.find((item) => item._id === cartItem._id);
    console.log(item, cartItem);
    if (item) {
      let index = items.indexOf(item);
      items[index].qty += 1;
    }
    setCartItems(items);

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setAuto(!auto);
  }

  function decreaseQty(cartItem) {
    let items = cartItems;
    let item = items.find((item) => item._id === cartItem._id);
    console.log(item, cartItem);
    if (item && item.qty > 1) {
      let index = items.indexOf(item);
      items[index].qty -= 1;
    }
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setAuto(!auto);
  }

  function resetCart() {
    localStorage.removeItem("cart");
    setCartItems([]);
  }

  const ecommerce = {
    cartItems,
    auto,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    resetCart,
    toggleCart,
    toggel,
  };
  return (
    <CartContext.Provider value={ecommerce}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
