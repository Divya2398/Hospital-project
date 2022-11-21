import React, { useEffect } from "react";
import { Input, Button, Form, Card, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Title } = Typography;

const Addreview = () => {
  //cuurent date
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  //CREATE FORM VARIABLE
  const [form] = Form.useForm();

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

  //INITIALIZE DEFAULT VALUES WHEN FORM LOADED
  useEffect(() => {
    form.setFieldsValue({
      date: date,
    });
  }, []);

  //handle submit
  const formSubmit = (values) => {};
  return (
    <>
      <div className="report-title">
        <Card
          title="New Review"
          style={{ width: "80%", margin: "0 auto" }}
          className=" rounded-3"
        >
          <Form {...responsive_layout} form={form} onFinish={formSubmit}>
            <Form.Item label="Today Date" name="date">
              <Input
                // placeholder="Today date"
                type="text"
                name="date"
                id="date"
                value="date"
              />
            </Form.Item>

            <Form.Item
              label="Consulation Review"
              type="text"
              name="review"
              //   rules={[
              //     {
              //       required: true,
              //       message: "Enter Consultation Review",
              //     },
              //   ]}
            >
              <Input.TextArea
                showCount
                maxLength={1500}
                placeholder="Write Consultation Review"
                type="text"
                name="review"
                id="review"
                rows={8}
              />
            </Form.Item>

            <Form.Item label="Prescription" type="text" name="prescription">
              <Input.TextArea
                showCount
                maxLength={800}
                placeholder="Prescription ..."
                type="text"
                name="prescription"
                id="prescription"
                rows={7}
              />
            </Form.Item>
            <Form.Item {...buttonLayout}>
              <Button type="primary" htmlType="submit">
                Add Review
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Addreview;
