import React, { useEffect, useRef, useState } from "react";
import {
  SearchOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Avatar,
  Image,
  Upload,
  Form,
  Modal,
  Select,
  Divider,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../Globals";
// const { Title } = Typography;
const { Option } = Select;

// import Highlighter from "react-highlight-words";

const Doctorlog = () => {
  const [state, setState] = useState({
    data: [],
  });
  // slot-time function
  const [time, setTime] = useState("");
  const [items, setItems] = useState([]);
  const [docImage, setDocImage] = useState({
    image: "",
  });

  const inputRef = useRef(null);
  const ontimeChange = (event) => {
    setTime(event.target.value);
  };
  let index = 0;
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, time || `New item ${index++}`]);
    setTime("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    axios.get(SERVER_URL + "api/specialist/getAllSpecialist").then((res) => {
      console.log(res.data.data);
      setState({
        data: res.data.data,
      });
    });
  }, []);

  const data = state.data;

  //edit functions
  const [isEditing, setIsEditing] = useState(false);
  const [editdetail, setEditdetail] = useState(null);

  const editdata = (data) => {
    console.log("data", data);
    setIsEditing(true);
    setEditdetail({ ...data });
  };

  console.log(setEditdetail);
  const resetEditing = () => {
    setIsEditing(false);
    setEditdetail(null);
  };

  //update data function
  const update = () => {
    console.log("editdetail", editdetail);

    let specialist_id = editdetail.specialist_id;

    let data = {
      specialist_name: editdetail.specialist_name,
    };

    let name = {
      specialist_id: editdetail.specialist_id,
    };
    axios
      .get(SERVER_URL + "api/specialist/getSingleSpecialist", { params: name })
      .then((res) => {
        console.log(res.data.data.image);
        let img1 = res.data.data.image;
        let img2 = docImage.image;
        if (img1 == img2) {
          console.log("without image");
          let data = {
            specialist_name: editdetail.specialist_name,
            specialist_id: editdetail.specialist_id,
          };
          axios
            .put(SERVER_URL + "api/specialist/updateDoctorWithoutImage", data)
            .then((res) => {
              console.log(res.data.result);

              axios
                .get(SERVER_URL + "api/specialist/getAllSpecialist")
                .then((res) => {
                  console.log(res.data.data);
                  setState({
                    data: res.data.data,
                  });
                });
            });
        } else {
          console.log("with image");

          //CREATE FORM DATA TO UPDATE WITH IMAGE
          if (docImage.image) {
            console.log("image", editdetail);
            const formData = new FormData();

            const config = {
              "Content-Type": "multipart/form-data",
            };

            formData.append("specialist_name", editdetail.specialist_name);
            formData.append("specialist_id", editdetail.specialist_id);
            formData.append("image", docImage.image);
            // formData.append('department_id', editdetail.department_id);
            // formData.append('password', editdetail.password);

            axios
              .put(
                SERVER_URL + "api/specialist/updateDoctorWithImg",
                formData,
                config
              )
              .then((res) => {
                console.log("res.data.data", res.data.result);
                axios
                  .get(SERVER_URL + "api/specialist/getAllSpecialist")
                  .then((res) => {
                    setState({
                      data: res.data.data,
                    });
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //search-filter function
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
      title: "Doctor Id",
      dataIndex: "specialist_id",
      key: "specialist_id",
      width: "15%",
      fixed: "left",
      ...getColumnSearchProps("specialist_id"),
    },
    {
      title: "Doctor Name",
      dataIndex: "specialist_name",
      key: "specialist_name",
      width: "15%",
      fixed: "left",
      ...getColumnSearchProps("specialist_name"),
    },
    {
      title: "Department",
      dataIndex: "department_id",
      key: "department_id",
      width: "16%",
      ...getColumnSearchProps("department_name"),
    },

    {
      title: "Doctor Profile",
      dataIndex: "image",
      key: "image",

      render: (image) => (
        <Avatar
          src={
            <Image
              src={SERVER_URL + "uploads/specialist/" + image}
              style={{ width: 32 }}
              alt="profile"
            />
          }
        />
      ),
    },

    {
      title: "Action",
      dataIndex: "",
      width: "10%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <Button
          type="primary"
          onClick={() => {
            editdata(data);
          }}
        >
          Update
        </Button>
      ),
    },
  ];

  // day picker
  const dayoption = [
    {
      value: "Monday",
    },
    {
      value: "Tuesday",
    },
    {
      value: "Wednesday",
    },
    {
      value: "Thursday",
    },
    {
      value: "Friday",
    },
    {
      value: "Saturday",
    },
    {
      value: "Sunday",
    },
    {
      value: "All",
    },
  ];

  const slotoption = [
    {
      value: "10:00 AM",
    },
    {
      value: "12:00 PM",
    },
    {
      value: "2:00 PM",
    },
    {
      value: "4:00 PM",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1300,
        }}
      />
      <div>
        <Modal
          title="Edit items"
          open={isEditing}
          okText="save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            {
              update();
            }
            resetEditing();
          }}
        >
          <div>
            <label>Specialist Name</label>
            <Input
              type="text"
              name="specialist_name"
              value={editdetail?.specialist_name}
              onChange={(e) => {
                setEditdetail((pre) => {
                  return { ...pre, specialist_name: e.target.value };
                });
              }}
            />
          </div>

          <div>
            <label>Upload</label>
            <Upload
              listType="picture"
              beforeUpload={(file) => {
                // setDocImage({
                //   image: file,
                // });
                console.log(docImage.image);
                return false;
              }}

              // onChange={handleOnChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>

          <div>
            <label>Current Image</label>
            {/* <Image width={100} src="" alt="logo" /> */}
            <Avatar
              src={
                <Image
                  src={SERVER_URL + "uploads/specialist/" + editdetail?.image}
                  style={{
                    width: 32,
                  }}
                />
              }
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Doctorlog;
