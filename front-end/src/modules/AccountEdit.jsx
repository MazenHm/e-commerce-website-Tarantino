import { Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBarAccount from "../components/SideBarAccount";
import { useAuth } from "../context/auth/authContext";
import { updateUser } from "../services/UserService";

const AccountEdit = () => {
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const auth = useAuth();
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(auth);
    if (auth && auth.user) {
      setUser(auth.user);
      setIsConnected(true);
      form.setFieldsValue({
        fullname: auth.user?.fullname,
        email: auth.user?.email,
        phone: auth.user?.phone,
      });
      console.log(form.getFieldsValue())
    }
  }, [JSON.stringify(auth)]);

  async function handleUpdate(values) {
    if(!values.password){
      delete values.password
      delete values.confirm;
    }
    let payload = {
      body: { ...values},
      id: user._id,
    };
    delete payload.body.confirm;
    if (user && user._id) {
      let res = await updateUser(payload);
      if (res) {
        notification.success({ message: "user updated successfuly" });
      }
    }
  }

  return (
    <>
      <div className="category-top">
        <div className="category-top-content">
          <h1>EDIT ACCOUNT INFORMATION</h1>
        </div>
      </div>
      <div className="d-flex gap-5 mx-5">
        <SideBarAccount />
        <div className="contact-side-bar">
          <Form
            name="basic"
            onFinish={handleUpdate}
            autoComplete="off"
            form={form}
          >
            <legend className="legend inf">
              <span>ACCOUNT INFORMATION</span>
            </legend>
            <div className="d-flex justify-content-between">
              <div>
                <div className="form-outline mb-2">
                  <label className="form-label" for="form3Example1cg">
                    FULL NAME
                  </label>
                  <Form.Item                       name="fullname"
>
                    <Input
                      placeholder="name"
                      className="input-form"
                    />
                  </Form.Item>
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" for="form3Example4cg">
                    EMAIL
                  </label>
                  <Form.Item                       name="email"
>
                    <Input
                      placeholder="email"
                      className="input-form"
                    />
                  </Form.Item>
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" for="form3Example4cg">
                    PHONE NUMBER
                  </label>
                  <Form.Item                       name="phone"
>
                    <Input
                      placeholder="phone"
                      className="input-form"
                    />
                  </Form.Item>
                </div>
              </div>
              <div>
                <div className="form-outline mb-2">
                  <label className="form-label" for="form3Example4cg">
                    Password
                  </label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                       
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
                      
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
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
              </div>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button type="submit" className="bt-save">
                SAVE
              </button>
            </div>
            <Link to="/account">
              <p> &lt;&lt;Back</p>
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AccountEdit;
