import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, Image, Typography, message } from "antd";
import axios from "axios";
import "./Doctorapp.css";
import { SERVER_URL } from "../../../Globals";
import jwt_decode from "jwt-decode";
const { Title } = Typography;

const Patient_history = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  //handle submit

  const formSubmit = (values) => {
    const doc_token = localStorage.getItem("doctor-token");
    if (doc_token) {
      const decode = jwt_decode(doc_token);
      console.log("value", values);
      axios
        .post(
          SERVER_URL +
            `api/reports/view-patient-Report?department_id=${decode.department_id}&doctor_id=${decode.specialist_id}`,
          values
        )
        .then((res) => {
          console.log("res", res);
          if (res.data.status === "success") {
            setTimeout(() => {
              message.success(res.data.message);
            }, 1500);
            const data = res.data.data[0];
            // console.log("unique",data);
            // getPatientReport;
            navigate("/report-history", { state: { data } });
            // navigate("/department-patient_report", { state: { data } });
          } else {
            setTimeout(() => {
              message.warning(res.data.message);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log("error", err.message);
        });
    }
  };
  //back button
  const handleback = () => {
    navigate("/doctor-board");
  };
  //form-layout
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
    <div className="mt-5">
      <div className="mb-3">
        <button className="btn back-board py-1" onClick={handleback}>
          <i class="fa-solid fa-left-long"></i> back
        </button>
      </div>
      <div class="card mb-3 mx-auto " style={{ maxWidth: "600px" }}>
        <div className="card-header">
          <Title level={4} style={{ textAlign: "center" }} className="my-1">
            Get Patient Report
          </Title>
        </div>
        <div class="card-body">
          <Form {...responsive_layout} form={form} onFinish={formSubmit}>
            <Form.Item
              label="Patient Id:"
              type="text"
              name="patient_id"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Enter Your patient Id to get report",
                },
              ]}
            >
              <Input
                placeholder="Enter your Id"
                type="text"
                name="patient_id"
                id="patient_id"
              />
            </Form.Item>
            <Form.Item {...buttonLayout}>
              <Button type="primary" htmlType="submit" className="mt-2">
                get report
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Patient_history;
