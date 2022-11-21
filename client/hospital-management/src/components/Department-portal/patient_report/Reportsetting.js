import { Tabs } from "antd";
import Patientreports from "./Patientreports";
import Addreview from "./Addreview";

const ReportSetting = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="History" key="1">
          <Patientreports />
        </TabPane>
        <TabPane tab="Add new review" key="2">
          <Addreview />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ReportSetting;
