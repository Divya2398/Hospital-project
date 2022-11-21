import React from "react";
import Department from "./Department";
import Edit_dept from "./Edit_dept";
import { Tabs } from "antd";

const Departmentsetting = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Department" key="1">
          <Department />
        </TabPane>
        <TabPane tab="Edit" key="2">
          <Edit_dept />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Departmentsetting;
