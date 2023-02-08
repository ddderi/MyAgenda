import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import * as SQLite from "expo-sqlite";
import { State } from "react-native-gesture-handler";

const db = SQLite.openDatabase("todos.db");

type Task = {
  id?: any;
  name: string;
  done: number;
  time: string;
  date: string;
};

type TaskState = {
  tasks: Task[];
  dateDisplayed: string;
  needToBeLoaded: boolean;
  inputRef: boolean;
  tasksCompleted: Task[];
  tasksPending: Task[];
};

const initialState: TaskState = {
  tasks: [],
  dateDisplayed: moment(new Date()).format("DD/MM/YYYY"),
  needToBeLoaded: false,
  inputRef: false,
  tasksCompleted: [],
  tasksPending: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    triggerLoading: (state, action) => {
      state.needToBeLoaded = action.payload;
    },
    loadTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO todos (name, time, date, done) values (?,?,?,?)",
          [
            action.payload.name,
            action.payload.time,
            action.payload.date,
            action.payload.done,
          ],
          (txObj, resultSet) => {},
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });
    },
    deleteTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM todos WHERE id = ?",
          [action.payload.id],
          (txObj, resultSet) => {
            // console.log(resultSet);
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });
    },
    changeDone: (state, action: PayloadAction<Task>) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE todos SET done = ? WHERE id = ?",
          [!action.payload.done, action.payload.id],
          (txObj, resultSet) => {
            // console.log(resultSet);
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });
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
    setDateDisplay: (state, action) => {
      state.dateDisplayed = action.payload;
    },
    setInputRef: (state, action) => {
      state.inputRef = action.payload;
    },
    loadCompletedTasks: (state, action) => {
      state.tasksCompleted = action.payload;
    },
    loadPendingTasks: (state, action) => {
      state.tasksPending = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  changeDone,
  changeDateDisplay,
  loadTasks,
  triggerLoading,
  setDateDisplay,
  setInputRef,
  loadCompletedTasks,
  loadPendingTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
