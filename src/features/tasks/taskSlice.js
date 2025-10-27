import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  session: 1,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare({ text, estPomos, note }) {
        return {
          payload: {
            id: nanoid(),
            text,
            estPomos,
            note,
            completed: false,
          },
        };
      },
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    // 🔥 Tambahan baru:
    clearFinished: (state) => {
      state.tasks = state.tasks.filter((t) => !t.completed);
    },

    clearAll: (state) => {
      state.tasks = [];
    },

    nextSession: (state) => {
      state.session += 1;
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  clearFinished,
  clearAll,
  nextSession,
} = taskSlice.actions;

export default taskSlice.reducer;
