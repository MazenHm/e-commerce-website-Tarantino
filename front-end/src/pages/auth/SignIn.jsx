import React from "react";
import "./sign.css";
import Footer from "../../layout/Footer";
import { Form, Input, notification } from "antd";
import {
  authenticate,
  getConnectedUser,
  storeToken,
} from "../../services/UserService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
  
const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const onFinish = async (values) => {
    let user = {
      email: values.email,
      password: values.password,
    };
    console.log(user);
    const res = await authenticate(user);
    let path = location.state?.redirect || "/";
    console.log(location.state);
    if (res.data) {
      console.log(res.data);
      let response = await getConnectedUser(res.data.token);
      if (response.data) {
        console.log(response.data);
        auth.setUser(response.data);
      }
      storeToken(res.data.token);
      navigate(path);
    } else if (res.err) {
      console.log(res.err);
      notification.error({
        title: "Create User",
        message: res.err.response.data.message,
      });
    }

    console.log(res);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
  
    <div className="main-section">
      <h2 className="text-center title mb-4">CUSTOMER LOGIN</h2>

      <section className="">
        <div className="d-flex align-items-center h-100">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card ">
                  <div className="card-body ">
                    <Form
                      name="basic"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <legend className="legend">
                        <span className="mb-3">Registered Customers</span>
                        <br />
                        <span>
                          If you have an account, sign in with your email
                          address.
                        </span>
                      </legend>
                      <div className="form-outline mb-2">
                        <label className="form-label" for="form3Example1cg">
                          Email
                        </label>
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "This is a required field.",
                            },
                            //   {
                            //     pattern: /^[-\s\.]?[a-z]*[A-Z]*$/,
                            //     message: "Please input your FULL NAME!",
                            //   },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" for="form3Example3cg">
                          Password
                        </label>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "This is a required field.",
                            },
                            //   {
                            //     pattern: /^[-\s\.]?[0-9]{8}$/,

                            //     message: "Invalid Phone Number!",
                            //   },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button type="submit" className="bt-primary">
                          Sign In
                        </button>
                      </div>
                      <hr />
                      <legend className="legend">
                        <span className="mb-3">New Customers</span>
                        <br />
                      </legend>
                      <p>
                        Creating an account has many benefits: check out faster,
                        keep more than one address, track orders and more.
                      </p>
                      <Link
                        to="/signup"
                        className="d-flex justify-content-center mb-5"
                      >
                        <button type="button" className="bt-primary">
                          CREATE AN ACCOUNT
                        </button>
                      </Link>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default SignIn;
