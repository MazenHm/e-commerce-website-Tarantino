import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useWishList } from "../context/wishList/wishListContext";
const ProductCard = (props) => {
  const wishList = useWishList();
  const [wishListItems, setWishListItems] = useState([]);
  useEffect(() => {
    if (wishList.wishListItems && wishList.wishListItems.length > 0) {
      setWishListItems(wishList.wishListItems);
    }
  }, [wishList.auto, JSON.stringify(wishList.wishListItems)]);
  const handleAddItem = (e, item) => {
    e.preventDefault();

    wishList.addItem(item);
  };

  const getProductPrice = (options) => {

    if(options && options.length > 0){
      let productPrice = options[0].price;

      options?.map((option) => {
        if (productPrice > option.price) {
          productPrice = option.price;
        }
      });
      return productPrice;
    }
   
  };

  const inWishlist = (id) => {
    if (wishListItems && wishListItems.length > 0) {
      let item = wishListItems.find((i) => i.id == id);
      if (item) return true;
    }
    return false;
  };
  return (
    <Link
      to={`/product/${props.id}`}
      className="card"
      style={{ width: "20rem" }}
    >
      <img className="card-img-top" src={props.image} alt="Card" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 -10 40 127.39"
        height={22}
        width={44}
        {...props}
        onClick={(e) => handleAddItem(e, { ...props })}
      >
        <path
          d="M60.83 17.18c8-8.35 13.62-15.57 26-17 23.17-2.64 44.44 21.08 32.74 44.43-3.33 6.65-10.11 14.56-17.61 22.32-8.23 8.52-17.34 16.87-23.72 23.2l-17.4 17.26-14.38-13.84C29.16 76.89 1 55.92 0 29.94-.63 11.74 13.73.08 30.25.29c14.76.2 21 7.54 30.58 16.89Z"
          fill={inWishlist(props.id) ? "red" : "transparent"}
          stroke={inWishlist(props.id) ? "red" : "#000"}
          stroke-width="10"
        />
      </svg>

      <div className="card-body p-1">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">
          <a href="#home">{props.description}</a> <br />
          <p>From {getProductPrice(props.option)} Dinars</p>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
