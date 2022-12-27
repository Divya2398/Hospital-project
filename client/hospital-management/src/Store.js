import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/UserSlice";
import doctorReducer from "./redux/doctor/DoctorSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
  },
});
export default store;
