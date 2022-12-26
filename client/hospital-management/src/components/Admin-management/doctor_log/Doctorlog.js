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
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../Globals";
// const { Title } = Typography;
const { Option } = Select;

// import Highlighter from "react-highlight-words";

const Doctorlog = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    data: [],
  });
  // slot-time function
  const [time, setTime] = useState("");
  const [items, setItems] = useState([]);
  const [docImage, setDocImage] = useState({
    image: "",
  });
  //edit functions
  const [isEditing, setIsEditing] = useState(false);
  const [editdetail, setEditdetail] = useState(null);

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

  const getdoctor = () => {
    axios.get(SERVER_URL + "api/specialist/getAllSpecialist").then((res) => {
      console.log(res.data.data);
      setState({
        data: res.data.data,
      });
    });
  };
  useEffect(() => {
    getdoctor();
  }, []);

  const data = state.data;
  console.log(data, "data");

  const editdata = (data) => {
    console.log("data", data);
    setIsEditing(true);
    setEditdetail({ ...data });
  };
  console.log("detail", editdetail);

  console.log(setEditdetail);
  const resetEditing = () => {
    setIsEditing(false);
    setEditdetail(null);
  };

  //day
  const handleChangeDay = (values) => {
    const selected = [];
    console.log("day values", values);
    for (let i = 0; i < values.length; i++) {
      selected.push(values[i].value);
    }
    setEditdetail((pre) => {
      return { ...pre, availableday: selected };
    });
  };

  //handle edit
  const handleedit = (values) => {
    // console.log(values);
    let data = {
      specialist_name: editdetail.specialist_name,
      number: editdetail.number,
      specialisation: editdetail.specialisation,
      experience: editdetail.experience,
      education: editdetail.education,
      time: editdetail.time,
    };
    console.log(editdetail.specialist_id, "data");
    axios
      .put(
        SERVER_URL +
          `api/specialist/updateDoctorWithoutImage/${editdetail.specialist_id}`,
        { data }
      )
      .then((res) => {
        console.log("res.data.result", res.data.status);
        if (res.data.status === "success") {
          console.log("true");
          setTimeout(() => {
            message.success(res.data.message);
          }, 1500);
          getdoctor();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // formData.append("department_name", "name");
  };

  //update data function
  const updateimage = () => {
    console.log("editdetail", editdetail);
    let specialist_id = editdetail.specialist_id;
    //CREATE FORM DATA TO UPDATE WITH IMAGE
    console.log("img", docImage.image);
    const formData = new FormData();
    const config = {
      "Content-Type": "multipart/form-data",
    };
    formData.append("image", docImage.image);
    formData.append("specialist_id", editdetail.specialist_id);
    axios
      .put(SERVER_URL + "api/specialist/updateDoctorWithImg", formData)
      .then((res) => {
        console.log("res.data.data", res.data);
        if (res.data.status === "success") {
          setTimeout(() => {
            message.success(res.data.message);
          }, 1000);

          getdoctor();
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
      fixed: "left",
      ...getColumnSearchProps("specialist_id"),
    },
    {
      title: "Doctor Name",
      dataIndex: "specialist_name",
      key: "specialist_name",
      fixed: "left",
      ...getColumnSearchProps("specialist_name"),
    },
    {
      title: "Department",
      dataIndex: "department_id",
      key: "department_id",
      ...getColumnSearchProps("department_id"),
    },
    {
      title: "Department Name",
      dataIndex: "department_name",
      key: "department_name",
      ...getColumnSearchProps("department_name"),
    },
    {
      title: "Available day",
      dataIndex: "available_day",
      key: "available_day",
      render: (available_day) => available_day.map((service) => service).join(),
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
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Specialisation",
      dataIndex: "specialisation",
      key: "specialisation",
    },
    {
      title: "Op time",
      dataIndex: "time",
      key: "time",
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
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 2100,
        }}
      />
      <div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit Specialist Detail
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <label className="form-lable mb-2">Specialist name</label>
                  <Input
                    className="mb-2"
                    placeholder="Enter doctor Name"
                    type="text"
                    name="specialist_name"
                    id="specialist_name"
                    value={editdetail?.specialist_name}
                    onChange={(e) => {
                      setEditdetail((pre) => {
                        return { ...pre, specialist_name: e.target.value };
                      });
                    }}
                  />
                  <label className="form-lable  mb-2">Specialisation</label>
                  <Input
                    className="mb-2"
                    placeholder="specialisation - eg: Dermatologist"
                    type="text"
                    name="specialisation"
                    id="specialisation"
                    value={editdetail?.specialisation}
                    onChange={(e) => {
                      setEditdetail((pre) => {
                        return { ...pre, specialisation: e.target.value };
                      });
                    }}
                  />
                  <label className="form-lable  mb-2">Experience</label>
                  <Input
                    className="mb-2"
                    placeholder="Experience - 4 yrs"
                    type="text"
                    name=" experience"
                    id=" experience"
                    value={editdetail?.experience}
                    onChange={(e) => {
                      setEditdetail((pre) => {
                        return { ...pre, experience: e.target.value };
                      });
                    }}
                  />
                  <label className="form-lable  mb-2">Education</label>
                  <Input
                    className="mb-2"
                    placeholder="Education detail - MBBS ,MD"
                    type="text"
                    name="education"
                    id="education"
                    value={editdetail?.education}
                    onChange={(e) => {
                      setEditdetail((pre) => {
                        return { ...pre, education: e.target.value };
                      });
                    }}
                  />
                  <label className="form-lable  mb-2">Op time</label>
                  <Input
                    className="mb-2"
                    placeholder="Eg: 12.00 - 2.00 pm"
                    type="text"
                    name=" time"
                    id="time"
                    value={editdetail?.time}
                    onChange={(e) => {
                      setEditdetail((pre) => {
                        return { ...pre, time: e.target.value };
                      });
                    }}
                  />
                  <label className="form-lable  mb-2">Mobile Number</label>
                  <Input
                    className="mb-2"
                    placeholder="Mobile Number - 9237037443"
                    type="text"
                    name="number"
                    id="number"
                    value={editdetail?.number}
                    onChange={(e) => {
                      setEditdetail((pre) => {
                        return { ...pre, number: e.target.value };
                      });
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleedit}
                    className="mt-3 btn btn-primary"
                  >
                    Update Information
                  </button>
                </form>
                <div className="mt-4">
                  <label className="form-label">Upload profile</label>
                  <Upload
                    listType="picture"
                    beforeUpload={(file) => {
                      setDocImage({
                        image: file,
                      });
                      console.log(docImage.image);
                      console.log({ file });
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </div>

                <div>
                  <label>Current Image</label>

                  <Avatar
                    src={
                      <Image
                        src={
                          SERVER_URL + "uploads/specialist/" + editdetail?.image
                        }
                        style={{
                          width: 32,
                        }}
                      />
                    }
                  />
                  <button
                    className="m-3 btn btn-primary"
                    type="button"
                    onClick={updateimage}
                  >
                    Update Image
                  </button>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorlog;

{
  /* <Modal
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
> */
}
{
  /* <form>
  <label className="form-lable mb-2">Specialist name</label>
  <Input
    className="mb-2"
    placeholder="Enter doctor Name"
    type="text"
    name="specialist_name"
    id="specialist_name"
    value={editdetail?.specialist_name}
    onChange={(e) => {
      setEditdetail((pre) => {
        return { ...pre, specialist_name: e.target.value };
      });
    }}
  />
  <label className="form-lable  mb-2">Specialisation</label>
  <Input
    className="mb-2"
    placeholder="specialisation - eg: Dermatologist"
    type="text"
    name="specialisation"
    id="specialisation"
    value={editdetail?.specialisation}
    onChange={(e) => {
      setEditdetail((pre) => {
        return { ...pre, specialisation: e.target.value };
      });
    }}
  />
  <label className="form-lable  mb-2">Experience</label>
  <Input
    className="mb-2"
    placeholder="Experience - 4 yrs"
    type="text"
    name=" experience"
    id=" experience"
    value={editdetail?.experience}
    onChange={(e) => {
      setEditdetail((pre) => {
        return { ...pre, experience: e.target.value };
      });
    }}
  />
  <label className="form-lable  mb-2">Education</label>
  <Input
    className="mb-2"
    placeholder="Education detail - MBBS ,MD"
    type="text"
    name="education"
    id="education"
    value={editdetail?.education}
    onChange={(e) => {
      setEditdetail((pre) => {
        return { ...pre, education: e.target.value };
      });
    }}
  />
  <label className="form-lable  mb-2">Op time</label>
  <Input
    className="mb-2"
    placeholder="Eg: 12.00 - 2.00 pm"
    type="text"
    name=" time"
    id="time"
    value={editdetail?.time}
    onChange={(e) => {
      setEditdetail((pre) => {
        return { ...pre, time: e.target.value };
      });
    }}
  />
  <label className="form-lable  mb-2">Mobile Number</label>
  <Input
    className="mb-2"
    placeholder="Mobile Number - 9237037443"
    type="text"
    name="number"
    id="number"
    value={editdetail?.number}
    onChange={(e) => {
      setEditdetail((pre) => {
        return { ...pre, number: e.target.value };
      });
    }}
  />
  <label className="form-lable  mb-2">Available Day</label>
  <Select
    className="mb-2"
    mode="multiple"
    showArrow
    allowClear
    style={{
      width: "100%",
    }}
    placeholder="Choose Doctors Available Day"
    options={dayoption}
    onChange={handleChangeDay}
  />
  <button type="primary" onClick={handleedit} className="mt-3">
    Update Information
  </button>
</form>
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


  >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
</div>

<div>
  <label>Current Image</label> */
}
{
  /* <Image width={100} src="" alt="logo" /> */
}
{
  /* <Avatar
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
  </Modal> */
}
