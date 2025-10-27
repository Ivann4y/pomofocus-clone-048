// src/features/timer/timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "pomodoro",
  isRunning: false,
  timeLeft: 25 * 60,
  cycleCount: 0, // untuk menentukan kapan long break
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    tick: (state) => {
      if (state.isRunning && state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else if (state.isRunning && state.timeLeft === 0) {
        // otomatis berhenti dan pindah mode
        state.isRunning = false;

        if (state.mode === "pomodoro") {
          state.cycleCount += 1;
          if (state.cycleCount % 4 === 0) {
            state.mode = "long";
            state.timeLeft = 15 * 60;
          } else {
            state.mode = "short";
            state.timeLeft = 5 * 60;
          }
        } else {
          state.mode = "pomodoro";
          state.timeLeft = 25 * 60;
        }
      }
    },
    switchMode: (state, action) => {
      const mode = action.payload;
      state.mode = mode;
      state.isRunning = false;

      if (mode === "pomodoro") state.timeLeft = 25 * 60;
      if (mode === "short") state.timeLeft = 5 * 60;
      if (mode === "long") state.timeLeft = 15 * 60;
    },
    nextMode: (state) => {
      // tombol next manual
      if (state.mode === "pomodoro") {
        state.mode = "short";
        state.timeLeft = 5 * 60;
      } else if (state.mode === "short") {
        state.mode = "long";
        state.timeLeft = 15 * 60;
      } else {
        state.mode = "pomodoro";
        state.timeLeft = 25 * 60;
      }
      state.isRunning = false;
    },
  },
});

export const { startTimer, pauseTimer, switchMode, tick, nextMode } =
  timerSlice.actions;

export default timerSlice.reducer;
