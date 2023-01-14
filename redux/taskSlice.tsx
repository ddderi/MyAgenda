import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todos.db");

// db.transaction((tx) => {
//   tx.executeSql(
//     `SELECT * FROM todos`,
//     undefined,
//     (txObj, resultSet) => {
//       console.log("test", resultSet.rows._array);
//     },
//     (_, error): boolean | any => {
//       console.warn(error);
//     }
//   );
// });

type Task = {
  id?: any;
  name: string;
  done: number;
  time: string;
  date: string;
};

type dateDisplayedType = {};

type TaskState = {
  tasks: Task[];
  dateDisplayed: string;
  needToBeLoaded: boolean;
};

const initialState: TaskState = {
  tasks: [],
  dateDisplayed: moment(new Date()).format("DD/MM/YYYY"),
  needToBeLoaded: false,
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
          (txObj, resultSet) => {
            // console.log("lui jveu voir", action.payload);
          },
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
            console.log(resultSet);
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
  },
});

export const {
  addTask,
  deleteTask,
  changeDone,
  changeDateDisplay,
  loadTasks,
  triggerLoading,
} = taskSlice.actions;

export default taskSlice.reducer;
