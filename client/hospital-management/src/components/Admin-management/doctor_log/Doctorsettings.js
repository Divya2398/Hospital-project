import React from "react";
// import Department from "./Department";
// import Edit_dept from "./Edit_dept";
import { Tabs } from "antd";
import Doctorlog from "./Doctorlog";
import Edit_doc from "./Edit_doc";

const Doctorsettings = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Specialist Log" key="1">
          <Doctorlog />
        </TabPane>
        <TabPane tab="Slot Log" key="2">
          <Edit_doc />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Doctorsettings;
