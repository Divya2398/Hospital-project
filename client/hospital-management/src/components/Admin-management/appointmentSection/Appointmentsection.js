import React from "react";
import { Tabs } from "antd";
import Confirm from "./Confirm";
import Pending from "./Pending";

const Appointmentsection = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Pending Appointments" key="1">
          <Pending />
        </TabPane>
        <TabPane tab="Confirmed Appointments" key="2">
          <Confirm />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Appointmentsection;
