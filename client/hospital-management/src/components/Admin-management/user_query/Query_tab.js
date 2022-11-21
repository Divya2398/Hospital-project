import React from "react";
import Query from "./Query";
import Feedback from "./Feedback";
import Complaint from "./Complaint";
import { Tabs } from "antd";
const Query_tab = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <>
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Query" key="1">
            <Query />
          </TabPane>
          <TabPane tab="Feedback" key="2">
            <Feedback />
          </TabPane>
          <TabPane tab="Complaint" key="3">
            <Complaint />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Query_tab;
