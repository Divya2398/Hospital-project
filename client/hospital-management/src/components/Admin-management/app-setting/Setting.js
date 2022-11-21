import { Tabs } from "antd";
import Appsetting from "../app-setting/Appsetting";
import App_edit from "./App_edit";

const Setting = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="App Settings" key="1">
          <Appsetting />
        </TabPane>
        <TabPane tab="Edit" key="2">
          <App_edit />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Setting;
