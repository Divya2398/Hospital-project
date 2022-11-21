import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, Image, Typography } from "antd";
const { Title } = Typography;

const Dept_patient = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  //handle submit
  const formSubmit = () => {
    navigate("/report-history");
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
    <>
      <div className="mt-5">
        <div class="card mb-3 mx-auto " style={{ maxWidth: "600px" }}>
          <div className="card-header">
            <Title level={4} style={{ textAlign: "center" }} className="my-1">
              Get Patient Report Of This Department
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
    </>
  );
};

export default Dept_patient;
