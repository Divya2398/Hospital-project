import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, Image, Typography, message } from "antd";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const loginStatus = localStorage.getItem("loginStatus")
  ? localStorage.getItem("loginStatus")
  : false;

const initialState = {
  loginStatus,
  user: {},
  token,
  isFetching: false,
  error: "",
  success: false,
};

// export const userlogin = createAsyncThunk("user/userlogin", (values) => {
//   axios
//     .post("http://localhost:8080/v1/api/admin/common-login", values)
//     .then((res) => {
//       console.log("res", res);
//       console.log("res", res.data.data);
//       // console.log("decode", jwt_decode(res.data.data));

//       if (res.data.status === "success") {
//         localStorage.setItem("token", res.data.data);
//         setTimeout(() => {
//           message.success(res.data.message);
//         }, 1000);
//       } else {
//         console.log("login");
//         setTimeout(() => {
//           message.warning(res.data.message);
//         }, 1000);
//         // window.location.href = "/";
//       }
//       return res.data;
//     });
// });

export const userlogin = createAsyncThunk(
  "user/userlogin",
  async (values, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8080/v1/api/admin/common-login",
        values,
        config
      );
      // store user's token in local storage
      console.log("data", data);
      console.log("res", data.data);
      if (data.status === "success") {
        localStorage.setItem("token", data.data);
        localStorage.setItem("loginStatus", true);

        // localStorage.setItem("token", res.data.data);
        setTimeout(() => {
          message.success(data.message);
        }, 1000);
        // const decode = jwt_decode(data.data);
        //  window.location.href = "/";
        return data.data;
      } else {
        setTimeout(() => {
          message.error(data.message);
        }, 1000);
        return rejectWithValue(data.message);
      }
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("loginStatus");
      localStorage.removeItem("token"); // deletes token from storage
      state.loginStatus = false;
      state.isFetching = false;
      state.user = null;
      state.token = null;
      state.error = "";
    },
  },
  extraReducers: (bulider) => {
    bulider.addCase(userlogin.pending, (state) => {
      state.isFetching = true;
    });
    bulider.addCase(userlogin.fulfilled, (state, action) => {
      console.log("action", action);
      state.isFetching = false;
      state.token = action.payload;
      state.error = "";
      state.loginStatus = true;
      state.user = jwt_decode(action.payload);
    });
    bulider.addCase(userlogin.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
