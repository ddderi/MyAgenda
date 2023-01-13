import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

type Task = {
  id: string;
  name: string;
  done: boolean;
  time: string;
  date: string;
};

type dateDisplayedType = {};

type TaskState = {
  tasks: Task[];
  dateDisplayed: string;
};

const initialState: TaskState = {
  tasks: [],
  dateDisplayed: moment(new Date()).format("DD/MM/YYYY"),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    changeDone: (state, action: PayloadAction<Task>) => {
      let index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      let task = state.tasks[index];
      task.done = !task.done;
      // console.log(state.tasks[index]);
    },
    changeDateDisplay: (state, action) => {
      const conditionAction = action.payload.action;
      if (conditionAction === "add") {
        const addOneDay = moment(state.dateDisplayed, "DD/MM/YYYY").add(
          1,
          "days"
        );
        state.dateDisplayed = moment(addOneDay).format("DD/MM/YYYY");
      } else if (conditionAction === "subtract") {
        const lessOneDay = moment(state.dateDisplayed, "DD/MM/YYYY").subtract(
          1,
          "days"
        );
        state.dateDisplayed = moment(lessOneDay).format("DD/MM/YYYY");
      }
    },
  },
});

export const { addTask, deleteTask, changeDone, changeDateDisplay } =
  taskSlice.actions;

export default taskSlice.reducer;
