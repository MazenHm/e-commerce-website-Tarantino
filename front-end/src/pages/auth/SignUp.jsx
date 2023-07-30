import React from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Form, Input, notification } from "antd";
import "./sign.css";
import { createUser } from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    let user = {
      fullname: values.FULLNAME,
      email: values.Email,
      password: values.password,
      phone: values.PHONENUMBER,
    };
    console.log(user);
    const res = await createUser(user);
    if (res.data) {
      notification.success({
        title: "Create User",
        message: "User Added Succesully",
      });
      navigate("/signin");
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
      <h2 className="text-center title mb-4">CREATE NEW CUSTOMER ACCOUNT</h2>

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
                        <span>Personal Information</span>
                      </legend>
                      <div className="form-outline mb-2">
                        <label className="form-label" for="form3Example1cg">
                          FULL NAME
                        </label>
                        <Form.Item
                          name="FULLNAME"
                          rules={[
                            {
                              required: true,
                              message: "Please input your FULL NAME!",
                            },
                            {
                              pattern: /^[A-Za-z\s]+$/,
                              message: "Please input your FULL NAME!",
                            },
                          ]}
                          
                        > 
                          <Input />
                        </Form.Item>
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" for="form3Example3cg">
                          PHONE NUMBER
                        </label>
                        <Form.Item
                          name="PHONENUMBER"
                          rules={[
                            {
                              required: true,
                              message: "Please input your PHONE NUMBER!",
                            },
                            {
                              pattern: /^[-\s\.]?[0-9]{8}$/,

                              message: "Invalid Phone Number!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>

                      <legend class="legend">
                        <span>Sign-in Information</span>
                      </legend>
                      <div className="form-outline mb-2">
                        <label className="form-label" for="form3Example4cg">
                          Email
                        </label>
                        <Form.Item
                          name="Email"
                          rules={[
                            {
                              required: true,

                              message: "Please input your Email!",
                            },
                            {
                              pattern:
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

                              message: "Invalid Email!",
                            },
                          ]}
                        >
                          <Input type="email" />
                        </Form.Item>
                      </div>
                      <div className="form-outline mb-2">
                        <label className="form-label" for="form3Example4cg">
                          Password
                        </label>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Password!",
                            },
                            {
                              min: 8,
                              message: "Minimum 8 Characters!",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" for="form3Example4cdg">
                          Repeat your password
                        </label>
                        <Form.Item
                          name="confirm"
                          dependencies={["password"]}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("password") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(
                                    "The two passwords that you entered do not match!"
                                  )
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </div>


                      <div className="d-flex justify-content-center">
                        <button type="submit" className="bt-primary">
                          CREATE AN ACCOUNT
                        </button>
                      </div>

                      <p className="text-center text-muted mt-3 mb-0">
                        Have already an account?
                        <a href="#!" className="fw-bold text-body">
                          <Link to="/signin"><p> Login</p></Link>
                        </a>
                      </p>
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

export default SignUp;
