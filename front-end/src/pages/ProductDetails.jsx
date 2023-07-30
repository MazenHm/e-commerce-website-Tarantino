import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImages from "../components/ProductImages";
import { useCart } from "../context/cart/cartContext";

import { getProductById } from "../services/ProductService";
import { getAllFrames } from "../services/FrameService";
import { baseUrlImage } from "../services/config";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [option, setOption] = useState(null);
  const [frames, setFrames] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const ecommerce = useCart();

  const handleAddItem = (e) => {
    e.preventDefault();
    let item = {
      ...product,
      option: option,
      frame: selectedFrame,
      qty: 1,
    };
    console.log(ecommerce);
    ecommerce.addItem(item);
  };

  async function getProduct() {
    let data = await getProductById(id);
    if (data) {
      getProductPrice(data.option);
      setProduct(data);
    }
  }

  async function getFrame() {
    let data = await getAllFrames();
    if (data) {
      setFrames(data);
    }
  }

  useEffect(() => {
    if (id) {
      getProduct();
      getFrame();
    }
  }, []);

  const getProductPrice = (options) => {
    let product = options[0];

    options?.map((option) => {
      if (product.price > option.price) {
        product = option;
      }
    });

    setOption(product);
  };

  const handleChangePrice = (e) => {
    let item = product.option.find((i) => i._id == e.target.value);

    setOption(item);
  };

  return (
    <>
      {product && (
        <div className="product-details-wrapper">
          <div className="d-flex justify-content-between w-100 sumary">
            <div className="img-product w-100">
              <ProductImages images={product.images} />
            </div>
            <div className="d-flex flex-column w-100 gap-2 my-5">
              <div className="product_title ">
                <h1>{product.name}</h1>
              </div>
              <div className="price">
                <span>
                  From {option.price + (selectedFrame?.price || 0)} DT
                </span>
              </div>
              <div>
                <p className="product-description">{product.description}</p>
              </div>
              <div>
                <form className="d-flex flex-column gap-2 form-cart">
                  <div className="d-flex flex-column gap-2">
                    <label>Select size</label>
                    <select
                      onChange={(e) => handleChangePrice(e)}
                      value={option._id}
                    >
                      {product.option?.map((op) => (
                        <option value={op._id}>{op.size}</option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <label>Select frame</label>
                    <div className="frames">
                      {frames?.map((f) => (
                        <div
                          className={
                            selectedFrame && selectedFrame._id == f._id
                              ? "frame selected"
                              : "frame"
                          }
                          onClick={() => setSelectedFrame(f)}
                        >
                          <img
                            src={baseUrlImage + f.image}
                            height="50"
                            width="50"
                          />
                          <p className="d-flex">{f.color}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="my-3">
                    <button
                      className="bt-product"
                      onClick={(e) => handleAddItem(e)}
                    >
                      <i class="fas fa-shopping-bag"></i>
                      ADD TO CART
                    </button>
                    <button className="bt-product-w">
                      <i class="far fa-heart"></i> ADD TO WISHLIST
                    </button>
                  </div>
                </form>
                <div className="product-widget">
                  <div className="d-flex flex-column gap-2 img-product-widget ">
                    <img
                      src="/assets/icons/Shipping-icon.webp"
                      alt="satisfaction"
                    />

                    <p>Global shipping</p>
                  </div>
                  <div className="d-flex flex-column gap-2 img-product-widget">
                    <img
                      src="/assets/icons/Satisfaction-icon.webp"
                      alt="satisfaction"
                    />
                    <p>Global shipping</p>
                  </div>
                  <div className="d-flex flex-column gap-2 img-product-widget">
                    <img
                      src="/assets/icons/returns-icon.webp"
                      alt="satisfaction"
                    />
                    <p>Global shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
