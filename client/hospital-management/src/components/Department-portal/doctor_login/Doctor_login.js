import React from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../Globals";
import { Input, Button, Form, Typography, message } from "antd";
import axios from "axios";
import Password from "antd/lib/input/Password";
const { Title } = Typography;

const Doctor_login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  //handle submit
  const formSubmit = (values) => {
    console.log(values);
    axios
      .post(SERVER_URL + "api/specialist/doctor-login", values)
      .then((res) => {
        console.log("res", res);
        console.log("res", res.data.data);
        // console.log("decode", jwt_decode(res.data.data));

        if (res.data.status === "success") {
          localStorage.setItem("doctor-token", res.data.data);
          setTimeout(() => {
            message.success(res.data.message);
          }, 1000);
          navigate("/doctor-board");
        } else {
          setTimeout(() => {
            message.warning(res.data.message);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  const responsive_layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 6 },
      lg: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 18 },
      lg: { span: 18 },
    },
  };
  const buttonLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12, offset: 10 },
      md: { span: 12, offset: 10 },
      lg: { span: 12, offset: 10 },
    },
  };
  return (
    <>
      <div className="mt-5">
        <div class="card mb-3 mx-auto " style={{ maxWidth: "600px" }}>
          <div className="card-header">
            <Title level={3} style={{ textAlign: "center" }} className="my-1">
              Doctor Login
            </Title>
          </div>
          <div class="card-body">
            <Form {...responsive_layout} form={form} onFinish={formSubmit}>
              <Form.Item
                label="Doctor Id:"
                type="text"
                name="specialist_id"
                hasFeedback
                rules={[{ required: true, message: "Enter Your Id" }]}
              >
                <Input
                  placeholder="Enter your Id"
                  type="text"
                  name="specialist_id"
                  id="specialist_id"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  name="password"
                  placeholder="Enter your password"
                />
              </Form.Item>
              <Form.Item {...buttonLayout}>
                <Button type="primary" htmlType="submit" className="mt-2">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor_login;
