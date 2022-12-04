import React, { useState, useEffect, useRef } from "react";
import { Card, Table, Button, Input, Space } from "antd";
import {
  SearchOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { SERVER_URL } from "../../../Globals";
import moment, { relativeTimeRounding } from "moment";

import axios from "axios";

const Dept_patient_report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nodata, setNodata] = useState(false);
  const [state, setState] = useState({ data: [] });
  console.log(location.state.data, " useLocation Hook");
  const detail = location.state.data;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns = [
    {
      title: "Patient Id",
      dataIndex: "patient_id",
      key: "patient_id",
      ...getColumnSearchProps("patient_id"),
    },
    {
      title: "Ptient First Name",
      dataIndex: "data",
      key: "first_name",
      ...getColumnSearchProps("first_name"),
      render: (data) => data.first_name,
    },
    {
      title: "Ptient Last Name",
      dataIndex: "data",
      key: "last_name",
      // width: "10%",
      ...getColumnSearchProps("last_name"),
      render: (data) => data.last_name,
    },
    {
      title: "Doctor Id",
      dataIndex: "specialist_id",
      key: "specialist_id",
      ...getColumnSearchProps("specialist_id"),
    },
    {
      title: "Doctor Name",
      // dataIndex: "data",
      key: "doctor name",
      render: (data) => data.specialist_name,
      // ...getColumnSearchProps("specialist_name"),
    },
    {
      title: "Report",
      dataIndex: "",
      width: "15%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <>
          <Button
            onClick={() => {
              navigate("/report-history", { state: { data } });
            }}
          >
            Paient reports
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={detail}
        scroll={{
          x: 1300,
        }}
      />
    </>
  );
};

export default Dept_patient_report;
