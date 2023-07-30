import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import CartItem from "../components/CartItem";
import { calculateAmount } from "../utilities/helpers";
import { useCart } from "../context/cart/cartContext";
import { Link, useNavigate } from "react-router-dom";
const MiniCart = ({ open, onClose }) => {
  const [productData, setProductData] = useState([]);
  const ecommerce = useCart();
  const navigate = useNavigate();
  const { cartItems, auto } = ecommerce;

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setProductData(cartItems);
    }
  }, [auto, JSON.stringify(cartItems)]);

  const totalAmount = calculateAmount(productData);

  const continueNavigate = () => {
    ecommerce.toggel(true);

    navigate("/all-posters");
  };

 

  return (
    <Drawer placement={"right"} closable={false} onClose={onClose} open={open}>
      <div className="header-cart">
        <span onClick={onClose} className="close">
          &times;
        </span>
        <h3>Cart</h3>
        <img
          src="/assets/nav/167787.png"
          className="mx-3"
          height="17"
          width="19"
          alt="cart"
        />
      </div>
      {productData && productData.length > 0 ? (
        <>
          <section className="card-items">
            {productData.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </section>
          <div className="cart-contaierr d-flex flex-column gap-3">
            <div className="d-flex justify-content-between">
              <span>PRODUCT</span>
              <span>{productData.length}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold fs-5">Subtotal</span>
              <span className="fw-bold fs-5">{totalAmount}</span>
            </div>
            <Link to="/checkout">
              <button className="bt-primary">PROCEED TO CHECKOUT</button>
            </Link>
          </div>
        </>
      ) : (
        <>
        <div className="empty-container">
          <img src="/assets/nav/167787.png" height="38" width="40" alt="cart"/>
          <p className="empty-paragraphe">
            Your shopping cart is empty. Continue shopping and don’t forget to
            add your products to your shopping cart.
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
  );
};

export default MiniCart;
