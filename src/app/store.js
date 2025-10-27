import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "../features/timer/timerSlice";
import taskReducer from "../features/tasks/taskSlice"; // ✅ Tambahkan ini

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    tasks: taskReducer, // ✅ Daftarkan slice baru
  },
});
