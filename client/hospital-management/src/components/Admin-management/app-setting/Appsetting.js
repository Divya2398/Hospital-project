import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../Globals";
import {
  Input,
  InputNumber,
  Button,
  Upload,
  Form,
  Card,
  Image,
  Typography,
  Avatar,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Title } = Typography;

const Appsetting = () => {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    logo: "",
  });

  const [pic, setPic] = useState({
    picture: "",
  });

  const formSubmit = (values) => {
    console.log("values.logo", values.logo);

    values.logo = state.logo;

    console.log("state.logo", state.logo);

    let data = values;

    console.log("data", data);
    const formData = new FormData();
    formData.append("logo", data.logo);
    formData.append("title", data.title);
    formData.append("policy", data.policy);
    formData.append("contact_us", data.contact_us);
    formData.append("mobilenumber", data.mobilenumber);
    formData.append("emergency_number", data.emergency_number);
    formData.append("admin_email", data.admin_email);

    const headerCongif = {
      "Content-Type": "multipart/form-data",
    };

    axios
      .post(
        SERVER_URL + "api/appSettings/addAppSettings",
        formData,
        headerCongif
      )
      .then((res) => {
        console.log(res);
        axios.get(SERVER_URL + "api/appSettings/getAppSettings").then((res) => {
          console.log("data_set", res);
          setPic({
            picture: res.data.data[0].logo,
          });
          setTimeout(() => {
            message.success("Data has been added Successfully");
          }, 1000);
        });

        //  axios
        //   .post(
        //     SERVER_URL + "api/appSettings/addAppSettings",
        //     formData,
        //     headerCongif
        //   )
        //   .then((res) => {
        //     console.log(res);
        //     axios
        //       .get(SERVER_URL + "api/appSettings/getAppSettings")
        //       .then((res) => {
        //         console.log("data_set", res);
        //         setPic({
        //           picture: res.data.data[0].logo,
        //         });
        //       });
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });

        console.log("formReqData");
      });
  };

  useEffect(() => {
    localStorage.setItem("adminmail", "adminId678@gmail.com");
    let data = localStorage.getItem("adminmail");
    console.log(data);
    form.setFieldsValue({
      admin_email: data,
    });
  }, []);

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
      md: { span: 12, offset: 8 },
      lg: { span: 12, offset: 8 },
    },
  };
  return (
    <Card style={{ width: "50%", margin: "0 auto" }} className=" rounded-3">
      <Title level={3} style={{ textAlign: "center" }} className="mb-4">
        App Information
      </Title>
      <Form {...responsive_layout} form={form} onFinish={formSubmit}>
        <Form.Item label="Admin Email" type="text" name="admin_email">
          <Input
            placeholder="Admin Email"
            type="text"
            name="admin_email"
            id="admin_email"
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Organisation Name"
          type="text"
          name="title"
          rules={[{ required: true, message: "Enter Organisation Name" }]}
        >
          <Input
            placeholder="Organisation Name"
            type="text"
            name="title"
            id="title"
          />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="mobilenumber"
          rules={[
            {
              required: true,
              message: "Enter contact Number",
              pattern: new RegExp(/^\+?([0-9]{2})\)?([0-9]{4})?([0-9]{4})$/),
            },
          ]}
        >
          <Input
            addonBefore="+91"
            placeholder="mobile number"
            type="text"
            name="mobilenumber"
            id="mobile-number"
            maxLength={10}
            minLength={10}
          />
        </Form.Item>

        <Form.Item
          label="Emergency Number"
          name="emergency_number"
          rules={[
            {
              message: "Enter contact Number",
              pattern: new RegExp(/^\+?([0-9]{2})\)?([0-9]{4})?([0-9]{4})$/),
            },
          ]}
          // rules={[{ required: true, message: "Enter contact Number!" }]}
        >
          <Input
            placeholder="Enter Emergency Contact number"
            type="text"
            name="emergency_number"
            id="emergency_number"
          />
        </Form.Item>

        <Form.Item
          label="Contact Us Info"
          type="text"
          name="contact_us"
          rules={[
            { required: true, message: "Enter Contact Us page Information" },
          ]}
        >
          <Input.TextArea
            showCount
            maxLength={800}
            placeholder="Write Contact US page info here"
            type="text"
            name="contact_us"
            id="contact_us"
            rows={6}
          />
        </Form.Item>

        <Form.Item
          label="Privacy Policy"
          type="text"
          name="policy"
          rules={[
            {
              required: true,
              message: "Enter Privacy Policy page Information",
            },
          ]}
        >
          <Input.TextArea
            showCount
            maxLength={800}
            placeholder="Write Privacy Policy information here ..."
            type="text"
            name="policy"
            id="policy"
            rows={6}
          />
        </Form.Item>
        <Form.Item name="logo" label="Upload Logo">
          <Upload
            listType="picture"
            beforeUpload={(file) => {
              console.log(file);
              setState({
                logo: file,
              });
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload logo</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="App Logo">
          {/* <Image width={100} src="" alt="logo" /> */}
          <Avatar
            src={
              <Image
                src={SERVER_URL + "uploads/logo/" + pic.picture}
                style={{
                  width: 32,
                }}
              />
            }
          />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button type="primary" htmlType="submit">
            Add Information
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Appsetting;
