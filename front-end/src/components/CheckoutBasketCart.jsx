import React from 'react'
import { useCart } from '../context/cart/cartContext';
import { baseUrlImage } from '../services/config'

const CheckoutBasketCart = ({product}) => {
  const ecommerce = useCart()
  const handleDecreaseItem = (e) => {

    e.preventDefault();
    ecommerce.decreaseQty(product);
  };
  const handleIncreaseItem = (e) => {
    e.preventDefault();
    ecommerce.increaseQty(product);
  };
  const handleRemoveItem = (e) => {
    e.preventDefault();
    ecommerce.removeItem(product);
  };
  return (
    <div className='d-flex justify-content-between align-items-center product-cart'>
      <div className="d-flex flex-row align-items-center">
                  <div>
                    <img
                      src={baseUrlImage +product.images[0].url}
                      width="65"
                      height="80"
                      alt=""
                      id="image"
                    />
                  </div>
                  <div className="d-flex flex-column px-4">
                    <div>
                      <h6>{product.name}</h6>
                    </div>
                    <span className="pl-2">{product.option.height}*{product.option.width}cm</span>
                  </div>
                </div>
                <div className="pl-md-0 pl-2 d-flex gap-2">
                  <span className="small">Quantity: </span>{" "}
                  <span className=" text-secondary increase-decrease" onClick={(e) => handleDecreaseItem(e)}>-</span>
                  <span>{product.qty}</span>
                  <span className=" text-secondary increase-decrease" onClick={(e) => handleIncreaseItem(e)}>+</span>
                </div>
                <div className="pl-md-0 pl-1">
                  <b>{product.option.price + (product.frame?.price||0)}</b>
                </div>
                <div className="close" onClick={(e) => handleRemoveItem(e)}>&times;</div>
    </div>
  )
}

export default CheckoutBasketCart
