import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { useWishList } from "../context/wishList/wishListContext";
import { Link, useNavigate } from "react-router-dom";
import WishListItem from "./WishListItem";

const WishList = ({ open, onClose }) => {
  const [wishListItems, setWishListItems] = useState([]);
  const wishList = useWishList();
  const navigate = useNavigate();

  useEffect(() => {
    if (wishList.wishListItems && wishList.wishListItems.length > 0) {
      setWishListItems(wishList.wishListItems);
    }
  }, [wishList.auto, JSON.stringify(wishList.wishListItems)]);

  const continueNavigate = () => {
    wishList.toggelList(true);

    navigate("/all-posters");
  };

  return (
    <div>
      <Drawer
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <div className="header-cart">
          <span onClick={onClose} className="close">
            &times;
          </span>
          <h3>wishlist</h3>
          <img
            src="/assets/nav/167787.png"
            className="mx-3"
            height="17"
            width="19"
            alt="cart"
          />
        </div>
        {wishListItems && wishListItems.length > 0 ? (
          <>
            <section className="card-items">
              {wishListItems.map((item) => (
                <WishListItem key={item.id} item={item} />
              ))}
            </section>
            <div className="cart-contaierr d-flex flex-column gap-3">
              <div className="d-flex justify-content-between">
                <span>PRODUCT</span>
                <span>{wishListItems.length}</span>
              </div>
             
              <Link to="/news">
                <button className="bt-primary">CONTINUE BROWSING</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="empty-container">
              <img
                src="/assets/nav/heart-icon.png"
                height="38"
                width="40"
                alt="cart"
              />
              <p className="empty-paragraphe">
                Your favorites list is empty. Select the heart icon next to a
                product to include it in your favorites list.
              </p>
            </div>
            <div className="cart-contaierr d-flex flex-column gap-3">
              <button className="bt-primary" onClick={() => continueNavigate()}>
                CONTINUE BROWSING
              </button>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default WishList;
