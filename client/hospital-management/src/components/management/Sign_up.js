import Navbar from "../navbar/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Typography,
  Card,
  Modal,
  message,
} from "antd";
import { SERVER_URL } from "../../Globals";
import formData from "form-data";
const { Title } = Typography;
const { Option } = Select;
const { Paragraph } = Typography;
const Sign_up = () => {
  const [form] = Form.useForm();
  const [issuccess, setSuccess] = useState(false);
  const [patientid, setPatientid] = useState("");
  const navigate = useNavigate();
  const formSubmit = (values) => {
    console.log(values);
    //  console.log(values.dob.toDate())
    axios
      .post(SERVER_URL + "api/user/register", values)
      .then((res) => {
        console.log("res", res);
        if (res.data.status === "success") {
          setPatientid(res.data.result.patient_id);
          setTimeout(() => {
            message.success(res.data.message);
          }, 1000);

          setSuccess(true);
          // navigate("/login");
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
      sm: { span: 10 },
      md: { span: 8 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
      md: { span: 16 },
      lg: { span: 16 },
    },
  };
  const buttonLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12, offset: 12 },
      md: { span: 12, offset: 10 },
      lg: { span: 12, offset: 10 },
    },
  };
  // const [form] = Form.useForm();
  return (
    <>
      <Navbar></Navbar>
      <div className="row mt-4">
        <div className="col-md-8 col-sm-8 col-12 col-lg-5 mx-auto sign-card">
          <Card title="Sign-Up">
            <Form {...responsive_layout} form={form} onFinish={formSubmit}>
              <Form.Item
                label="First Name"
                type="text"
                name="first_name"
                hasFeedback
                rules={[{ required: true, message: "Enter Your First Name" }]}
              >
                <Input
                  placeholder="Enter Your First Name"
                  type="text"
                  name="first_name"
                  id="first_name"
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                type="text"
                name="last_name"
                hasFeedback
                rules={[{ required: true, message: "Enter Your Last Name" }]}
              >
                <Input
                  placeholder="Enter Your Last Name"
                  type="text"
                  name="last_name"
                  id="last_name"
                />
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="dob"
                id="dob"
                hasFeedback
                rules={[
                  { required: true, message: "Enter Your Date of Birth" },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Select Gender"
                rules={[
                  {
                    required: true,
                    message: "Please Select Your Gender",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="others">Other</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Mobile Number"
                name="mobile_number"
                id="mobile_number"
                rules={[
                  {
                    required: true,
                    message: "Enter contact Number",
                    pattern: new RegExp(
                      /^\+?([0-9]{2})\)?([0-9]{4})?([0-9]{4})$/
                    ),
                  },
                ]}
              >
                <Input
                  addonBefore="+91"
                  placeholder="Enter Mobile number"
                  type="text"
                  name="mobile_number"
                  id="mobile_number"
                  maxLength={10}
                  minLength={10}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Your Email"
                  type="email"
                  name="email"
                  id="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password name="password" />
              </Form.Item>

              <Form.Item {...buttonLayout}>
                <Button htmlType="submit" className="mt-2 login-button">
                  Register
                </Button>
              </Form.Item>
            </Form>
            <p className="text-center">
              Already have Patient ID then, &nbsp;
              <a href="/login" className="log-sign-link">
                Click here to Login
              </a>
            </p>
          </Card>
        </div>
      </div>
      <div>
        <Modal
          title="Patient Id"
          open={issuccess}
          okText="Ok"
          onOk={() => {
            {
              navigate("/login");
            }
            setSuccess(false);
          }}
          cancelButtonProps={{
            style: {
              display: "none",
            },
          }}
          className="modal-app"
        >
          <div>
            <Card>
              <p className="text-modal">
                Your Patient id :
                <Paragraph
                  copyable={{
                    tooltips: ["click here to copy", "you clicked!!"],
                  }}
                  className="d-inline"
                >
                  {patientid}
                </Paragraph>
                <br />
                Use this Id for Logging into your account in future. Copy this
                Id.
              </p>
            </Card>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Sign_up;
