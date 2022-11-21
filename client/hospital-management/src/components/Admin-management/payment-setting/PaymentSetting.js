import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import { Input, Button, Form, Card, Typography } from "antd";
const { Title } = Typography;
const PaymentSetting = () => {
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
          Payment Setting
        </Title>
        <Form {...responsive_layout}>
          <Form.Item
            label="Payment Key"
            type="text"
            name="key"
            hasFeedback
            rules={[{ required: true, message: "Enter key" }]}
          >
            <Input
              placeholder="Enter payment key"
              type="text"
              name="key"
              id="key"
            />
          </Form.Item>
          <Form.Item {...buttonLayout}>
            <Button type="primary" htmlType="submit" className="mt-3">
              Add key
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default PaymentSetting;
