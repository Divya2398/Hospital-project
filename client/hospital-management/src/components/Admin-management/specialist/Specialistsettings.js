import React from "react";
// import Department from "./Department";
// import Edit_dept from "./Edit_dept";
import { Tabs } from "antd";
import { Edit_spe } from "./Edit_spe";
import Specialist from "./Specialist";

const Specialistsetting = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Add Specialist" key="1">
          <Specialist />
        </TabPane>
        {/* <TabPane tab="Add Slot" key="2">
          <Edit_spe />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default Specialistsetting;
