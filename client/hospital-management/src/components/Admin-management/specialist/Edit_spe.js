
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Input,
  Button,
  Form,
  Card,
  Select,
  Typography,
  Divider,
  Space,
  Upload,
  Avatar,
  Image,
  message
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { SERVER_URL } from "../../../Globals";
const { Title } = Typography;
const { Option } = Select;

export const Edit_spe = () => {

    const [state, setState] = useState({
        picture : ""
      })

      const [dep, setDep] = useState({
        department : ""
      })

      const [splist, setSplist] = useState({
        specialist : ""
      })
    
    
      //CREATE FORM VARIABLE
      const [form] = Form.useForm()
    
      //CREATE ARRAY OF DEPARTMENTS
      const [data, setData] = useState({
        departments : []
      })

      const [list, setList] = useState({
        specialist : []
      })
    
    
    
      //TO FETCH DEPARTMENTS TO DISPLAY
      useEffect(()=>{
        axios.get(SERVER_URL+"api/departements/getAllDepartments")
        .then((res)=>{
            console.log("departments", res)
            setData({
              departments : res.data.data
            })
        }).catch((err)=>{
          console.log(err)
        })

        console.log(dep.department)
        let data = {
            department_id : dep.department
        }

        axios.get(SERVER_URL+"api/specialist/getspecialistByDepId",{params : data})
        .then(res => {
            console.log("specialist", res.data.result)
            setList({
                specialist : res.data.result
              })
          }).catch((err)=>{
            console.log(err)
        })

        console.log(list.specialist)
    
      },[dep.department])

      console.log(list.specialist)
     
      const formSubmit = (values) =>{

        console.log(values)
        axios.post(SERVER_URL+"api/specialistDaySlot/addDaySlot", values)
        .then((res)=>{
          console.log("res", res)
        }).catch( err =>{
          console.log(err)
        })

      }
    
      //responsive layout
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
    
      // day picker
      const dayoption = [
        {
          value: "Monday",
        },
        {
          value: "Tuesday",
        },
        {
          value: "Wednesday",
        },
        {
          value: "Thursday",
        },
        {
          value: "Friday",
        },
        {
          value: "Saturday",
        },
        {
          value: "Sunday",
        },
        {
          value: "All",
        },
      ];
    
    
      const slotoption = [
        {
          value: "10:00 AM",
        },
        {
          value: "12:00 PM",
        },
        {
          value: "2:00 PM",
        },
        {
          value: "4:00 PM",
        },
      ]

  return (
    <div>
         <Card style={{ width: "50%", margin: "0 auto" }} className=" rounded-3">
        <Title level={3} style={{ textAlign: "center" }} className="mb-4">
          Specialist Detail
        </Title>
        <Form {...responsive_layout} form={form} onFinish={formSubmit}>
          <Form.Item
            name="department_id"
            label="Department Name"
            rules={[{ required: true, message: "Enter Department Name" }]}
          >
            <Select placeholder="Select a option below" allowClear
            onChange={(value)=>{
                setDep({department : value})
            }}>
              {/* <Option value="male">department 1</Option> */}
              {
                data.departments.map((options)=> (
                  <Option value={options.department_id} key={options.department_id}>{options.department_name}</Option>
                ))
              }
            </Select>
          </Form.Item>
          {/* <Form.Item
            label="Specialist Name"
            type="text"
            name="specialist_name"
            hasFeedback
            rules={[{ required: true, message: "Enter Specialist Name" }]}
          >
            <Input
              placeholder="Enter doctor Name"
              type="text"
              name="specialist_name"
              id="specialist_name"
            />
          </Form.Item> */}

            <Form.Item
            name="specialist_id"
            label="Specialist Name"
            rules={[{ required: true, message: "Enter Department Name" }]}
          >
            <Select placeholder="Select a option below" allowClear
            onChange={(value)=>{
                setSplist({specialist : value})
            }}>
              {/* <Option value="male">department 1</Option> */}
              {
                list.specialist.map((options)=> (
                  <Option value={options.specialist_id} key={options.specialist_id}>{options.specialist_name}</Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item
            name="available_day"
            label="Choose Available Day"
            rules={[{ required: true, message: "Enter Available Day" }]}
          >
            <Select placeholder="Select a option below" allowClear>
              {/* <Option value="male">department 1</Option> */}
              {
                dayoption.map((options)=> (
                  <Option value={options.value} key={options.value}>{options.value}</Option>
                ))
              }
            </Select>
          </Form.Item>

            <Form.Item
            name="available_slot"
            label="Choose Available Slot"
            rules={[{ required: true, message: "Enter Available Slot" }]}
          >
            <Select placeholder="Select a option below" allowClear>
              {/* <Option value="male">department 1</Option> */}
              {
                slotoption.map((options)=> (
                  <Option value={options.value} key={options.value}>{options.value}</Option>
                ))
              }
            </Select>
          </Form.Item>


          {/* <Form.Item
            name="profile_pic"
            label="Profile"
            rules={[{ required: true }]}
          >
            <Upload 
            listType="picture"
            beforeUpload={(file) => {
              console.log(file);
              setState({
                picture: file,
              });
              return false;
            }}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item> */}

          <Form.Item {...buttonLayout}>
            <Button type="primary" htmlType="submit" className="mt-3">
              Add Information
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

