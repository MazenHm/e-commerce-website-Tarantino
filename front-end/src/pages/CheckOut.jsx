import { Form, Input } from "antd";
import Search from "antd/lib/transfer/search";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutBasketCart from "../components/CheckoutBasketCart";
import { useAuth } from "../context/auth/authContext";
import { Modal } from "antd";

import { useCart } from "../context/cart/cartContext";
import { addOrder } from "../services/OrderService";
import { getSession, updateUser } from "../services/UserService";
import { calculateAmount } from "../utilities/helpers";
import { validateCoupon } from "../services/CouponService";

const CheckOut = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isConnected, setIsConnected] = useState(false);
  const [productData, setProductData] = useState([]);
  const [user, setUser] = useState(null);
  const codeCoupon = useRef();
  const ecommerce = useCart();
  const auth = useAuth();
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const { cartItems, auto } = ecommerce;

  useEffect(() => {
    if (auth && auth.user) {
      setUser(auth.user);
      if (auth.user.addressId) {
        form?.setFieldsValue({
          line: auth.user.addressId.line,
          city: auth.user.addressId.city,
          state: auth.user.addressId.state,
          postalCode: auth.user.addressId.postalCode,
        });
      }
      setIsConnected(true);
    }
  }, [JSON.stringify(auth)]);
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setProductData(cartItems);
    }
  }, [auto, JSON.stringify(cartItems)]);

  const totalAmount = calculateAmount(productData);
  const onFinish = async (values) => {
    if (!isConnected) {
      navigate("/signin", {
        state: {
          redirect: "/checkout",
        },
      });
      return;
    }
    let payload = {
      id: user._id,
      body: {
        address: {
          postalCode: values.postalCode,
          line: values.line,
          city: values.city,
          state: values.state,
        },
      },
    };

    if (productData && productData.length == 0) {
      return;
    }
    let options = productData.map((product) => {
      return {
        articleId: product._id,
        qty: product.qty,
        frameId: product.frame?._id || null,
      };
    });
    let order = {
      userId: user._id,
      options: options,
      totalPrice: totalAmount - (totalAmount * discount) / 100,
      subTotal: totalAmount,
      couponCode:codeCoupon.current.value
    };

    let updatedUser = await updateUser(payload);
    if (updatedUser) {
      let responseOrder = await addOrder(order);
      if (responseOrder) {
        ecommerce.resetCart();
        showModal();
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const validate = async (e) => {
    e.preventDefault();
    let couponCode = codeCoupon.current.value;
    try {
      let response = await validateCoupon({ couponCode });
      console.log(response);
      if (response.status == 200) {
        setDiscount(response.data.discountPercentage);
        setCouponError("");
      }
    } catch (error) {
      setCouponError(error.response.data.message);
    }
  };

  return (
    <>
      <Modal title="Order Passed With Success" open={isModalOpen} footer={null}>
        <Link to="/">Back to shop</Link>
      </Modal>

      <div className="checkout pt-1">
        <div className="container bg-white rounded-top" id="zero-pad">
          <h4 className="text-center">CHECKOUT</h4>
          <div className="d-flex justify-content-center">
            <div className="row product-cart d-flex justify-content-center">
              <div className="col-lg-12 col-12 pt-3">
                <div className="d-flex flex-row justify-content-between align-items-center pt-lg-4 pt-2 pb-3 border-bottom mobile"></div>
                {productData &&
                  productData.length > 0 &&
                  productData.map((product) => (
                    <CheckoutBasketCart product={product} />
                  ))}

                <div
                  className="container bg-light rounded-bottom py-4"
                  id="zero-pad"
                >
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-10 col-12">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p>GIFT CARD OR DISCOUNT CODE?</p>
                          <input
                            type="text"
                            placeholder="code.."
                            ref={codeCoupon}
                            className={
                              couponError
                                ? "form-control error"
                                : "form-control"
                            }
                          />
                          {couponError && (
                            <p className="error">{couponError}</p>
                          )}
                        </div>
                        <div
                          class="d-flex flex-column px-md-0 px-1"
                          id="footer-font"
                        >
                          <b class="pl-md-4">
                            SUBTOTAL
                            <span class="pl-md-4"> {totalAmount} TND</span>
                          </b>
                          {discount > 0 && (
                            <b class="pl-md-4">
                              DISCOUNT
                              <span class="pl-md-4">
                                - {(totalAmount * discount) / 100} TND
                              </span>
                            </b>
                          )}
                          {discount > 0 && (
                            <b class="pl-md-4">
                              TOTAL{" "}
                              <span class="pl-md-4">
                                {totalAmount - (totalAmount * discount) / 100}{" "}
                                TND
                              </span>
                            </b>
                          )}
                        </div>
                        <div>
                          <button
                            onClick={(e) => validate(e)}
                            class="btn btn-sm bg-dark text-white px-lg-5 px-3"
                          >
                            CONTINUE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isConnected ? (
                <div class="container bg-white rounded-top mt-5" id="zero-pad">
                  <h4 className="text-center">YOUR ADRESSE</h4>
                  <div class="container">
                    <Form
                      name="basic"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                      form={form}
                      className="form-checkout"
                    >
                      <div className="row">
                        <div className=" d-flex justify-content-center mb-3">
                          <Form.Item name="country">
                            <Input
                              placeholder="country"
                              className="input-form"
                              disabled
                              defaultValue="TUNISIA"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className=" d-flex gap-2 justify-content-center mb-3">
                        <Form.Item>
                          <Input
                            placeholder="email"
                            className="input-form"
                            disabled
                            value={user?.email || ""}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Input
                            placeholder="phone"
                            className="input-form"
                            disabled
                            value={user?.phone || ""}
                          />
                        </Form.Item>
                      </div>
                      <div className=" d-flex gap-2 justify-content-center mb-3">
                        <Form.Item>
                          <Input
                            placeholder="fullname"
                            className="input-form"
                            disabled
                            value={user?.fullname || ""}
                          />
                        </Form.Item>
                      </div>
                      <div className=" d-flex gap-2 justify-content-center mb-3">
                        <Form.Item
                          name="line"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Address!",
                            },
                          ]}
                        >
                          <Input placeholder="Line" className="input-form" />
                        </Form.Item>
                        <Form.Item
                          name="city"
                          rules={[
                            {
                              required: true,
                              message: "Please input your City!",
                            },
                          ]}
                        >
                          <Input placeholder="City" className="input-form" />
                        </Form.Item>
                      </div>
                      <div className=" d-flex gap-2 justify-content-center mb-3">
                        <Form.Item
                          name="state"
                          rules={[
                            {
                              required: true,
                              message: "Please input your State!",
                            },
                          ]}
                        >
                          <Input placeholder="State" className="input-form" />
                        </Form.Item>
                        <Form.Item
                          name="postalCode"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Postal Code!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Postal Code"
                            className="input-form"
                          />
                        </Form.Item>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button className="check-btn" type="submit">
                          Order Now
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              ) : (
                <Link to="/signin" state={{ redirect: "/checkout" }}>
                  <button className="check-btn" type="submit">
                    Order Now
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
