import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
import {SERVER_URL} from '../../../Globals';
// import Swal from 'sweetalert2';
import '../app-setting/Appsettings.css';

import {
  Input,
  Button,
  Upload,
  Form,
  Card,
  Image,
  Typography,
  Avatar,
  message
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Title } = Typography;

const App_edit = () => {

  const [state, setState] = useState({
    picture: "",
  });

  const [logo, setLogo] = useState({
    image: "",
  });

  //CREATE FORM VARIABLE
  const [form] = Form.useForm()
  
  //INITIALIZE DEFAULT VALUES WHEN FORM LOADED
     useEffect(() => {
      axios
        .get(SERVER_URL+"api/appSettings/getAppSettings")
        .then((res) => {
          console.log(res.data.data[0].title);
          console.log(res.data.data);
          let data = localStorage.getItem('adminmail')
          setState({
            picture : res.data.data[0].logo
          })
          form.setFieldsValue({
            title : res.data.data[0].title,
            policy : res.data.data[0].policy,
            mobilenumber : res.data.data[0].mobilenumber,
            emergency_number : res.data.data[0].emergency_number,
            contact_us : res.data.data[0].contact_us,
            admin_email : data
          })
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, []);


  const formSubmit = (values) => {

    console.log(values)

    if(values.logo){

      values.logo = logo.image;

      const data = new FormData();
  
      data.append('title', values.title);
      data.append('logo', values.logo);
      data.append('policy', values.policy);
      data.append('mobilenumber', values.mobilenumber);
      data.append('contact_us', values.contact_us);
      data.append('emergency_number', values.emergency_number);
      data.append('admin_email', values.admin_email);
  
      axios.put(SERVER_URL+"api/appSettings/updateAppSettingsImage", data)
      .then((res)=>{
        console.log(res)
        axios.get(SERVER_URL+"api/appSettings/getAppSettings")
        .then((res)=>{
          console.log("image res", res.data.data[0].logo)
          setState({
            picture : res.data.data[0].logo
          })
          setTimeout(()=>{
            message.success("Data has been updated Successfully")
          }, 1000)
      
        }).catch((err)=>{
          console.log(err)
        })
      }).catch(err=>{
        console.group(err)
      })

    } else {

      let data = {
        "title" : values.title,
        "policy" : values.policy,
        "mobilenumber" : values.mobilenumber,
        "contact_us" : values.contact_us,
        "emergency_number" : values.emergency_number
      }

      axios.put(SERVER_URL+"api/appSettings/updateAppSettings", {admin_email : values.admin_email, data : data})
      .then((res)=>{
        console.log(res)
        setTimeout(()=>{
          message.success("Data has been updated Successfully")
        }, 1000)
      }).catch((err)=>{
        console.log(err)
      })

    }
   
  };

//FORM LAYOUT
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
    <>
      <Card style={{ width: "50%", margin: "0 auto" }} className=" rounded-3">

        <Title level={3} style={{ textAlign: "center" }} className="mb-4">
          Edit Information
        </Title>

        <Form {...responsive_layout} form={form} onFinish={formSubmit}>

          <Form.Item label="App Logo">
            {/* <Image width={100} src="" alt="logo" /> */}
            <Avatar
                  src={
                  <Image
                  src= {SERVER_URL+"uploads/logo/"+ state.picture}
                  style={{
                  width: 32,
                  }}
                  />
                  }
              />
          </Form.Item>

          <Form.Item name="logo" label="Upload Logo">
            <Upload
              listType="picture"
              beforeUpload={(file) => {
                console.log(file);
                setLogo({
                  image: file,
                });
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Edit logo</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Admin Email"
            type="text"
            name="admin_email"
          >
            <Input
              style={{
                borderBottom: "2px solid #d9d9d9",
              }}
              bordered={false}
              placeholder="Admin email"
              type="text"
              name="admin_email"
              id="admin"
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
              style={{
                borderBottom: "2px solid #d9d9d9",
              }}
              bordered={false}
              placeholder="Organisation Name"
              type="text"
              name="title"
              id="title"
            />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="mobilenumber"
            rules={[{ required: true, message: "Enter contact Number" }]}
          >
            <Input
              style={{
                borderBottom: "2px solid #d9d9d9",
              }}
              bordered={false}
              //   addonBefore="+91"
              placeholder="mobile number"
              type="text"
              name="mobilenumber"
              id="mobilenumber"
            />
          </Form.Item>

          <Form.Item
            label="Emergency Number"
            name="emergency_number"
            // rules={[{ required: true, message: "Enter contact Number!" }]}
          >
            <Input
              style={{
                borderBottom: "2px solid #d9d9d9",
              }}
              bordered={false}
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
              rows={7}
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
              rows={7}
            />
          </Form.Item>
          <Form.Item {...buttonLayout}>
            <Button type="primary" htmlType="submit">
              Update Information
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default App_edit;
