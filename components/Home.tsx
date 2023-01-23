import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Keyboard,
  Button,
} from "react-native";
import Task from "./features/Task";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDateDisplay,
  loadTasks,
  triggerLoading,
  setDateDisplay,
} from "../redux/taskSlice";
import { RootState } from "../redux/store";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import InputTask from "./features/InputTask";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import ButtonCustom from "./features/ButtonCustom";
import { Entypo } from "@expo/vector-icons";

const Home: React.FC = () => {
  const [inputDisplay, setInputDisplay] = useState<boolean>(false);
  const db = SQLite.openDatabase("todos.db");
  const datelocal = new Date();
  const datelocalStr = moment(datelocal).format("DD/MM/YYYY");
  const dispatch = useDispatch();
  const tasksArray = useSelector((state: RootState) => state.tasks.tasks);

  const dateDisplayed = useSelector(
    (state: RootState) => state.tasks.dateDisplayed
  );
  const stateLoaded = useSelector(
    (state: RootState) => state.tasks.needToBeLoaded
  );

  const dayOftheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const IndexOfDay = moment(dateDisplayed, "DD/MM/YYYY").weekday();

  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const [dateDisp, setDateDisp] = useState<boolean>(true);
  const [showinput, setShowinput] = useState<boolean>(false);
  const inputRef = React.createRef<any>();

  const resetState = () => {};

  const showInputTask = () => {};

  const taskFiltered = tasksArray.filter((task) => task.date == dateDisplayed);

  const taskMapped = taskFiltered.map((task) => (
    <Task
      id={task.id}
      key={task.id}
      name={task.name}
      done={task.done}
      time={task.time}
      date={task.date}
    />
  ));

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, done INTEGER DEFAULT "0", time TEXT, date TEXT)'
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM todos WHERE date < ?",
        [datelocalStr],
        (txObj, resultSet: any) => {
          console.log(resultSet.rows._array);
          // dispatch(loadTasks(resultSet.rows._array));
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      let x: any = null;
      tx.executeSql(
        "SELECT * FROM todos",
        x,
        (txObj, resultSet: any) => {
          dispatch(loadTasks(resultSet.rows._array));
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });
  }, []);

  useEffect(() => {
    if (stateLoaded === true) {
      let x: any = null;
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos",
          x,
          (txObj, resultSet: any) => {
            dispatch(loadTasks(resultSet.rows._array));
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });
      dispatch(triggerLoading(false));
    }
  }, [stateLoaded]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.taskWrapper}>
          {/* <View style={styles.menuicon}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AntDesign name="menufold" size={34} color="black" />
            </TouchableOpacity>
          </View> */}
          {datelocalStr == dateDisplayed ? (
            <View style={styles.todaytitle}>
              <Text style={styles.sectionTitle}>Today's tasks</Text>
            </View>
          ) : (
            <View style={styles.buttonback}>
              <ButtonCustom />
            </View>
          )}
        </View>
        <ScrollView>
          <View style={styles.arrowicon}>
            <AntDesign
              onPress={() =>
                dispatch(
                  changeDateDisplay({ dateDisplayed, action: "subtract" })
                )
              }
              name="leftcircleo"
              size={30}
              color="black"
            />
            <Text>
              {dayOftheWeek[IndexOfDay]}, {dateDisplayed}
            </Text>
            <AntDesign
              onPress={() =>
                dispatch(changeDateDisplay({ dateDisplayed, action: "add" }))
              }
              name="rightcircleo"
              size={30}
              color="black"
            />
          </View>
          <View style={styles.items}>{taskMapped}</View>
        </ScrollView>
        {!inputDisplay && (
          <></>
          // <TouchableOpacity onPress={() => inputRef.current.focus()}>
          //   <View style={styles.buttoninput}>
          //     {/* <TouchableOpacity onPress={() => setInputDisplay(true)}> */}
          //     <View style={styles.buttonborder}>
          //       <Entypo name="add-to-list" size={50} color="white" />
          //     </View>
          //   </View>
          // </TouchableOpacity>
        )}
        {inputDisplay && (
          <View>
            <InputTask
              ref={inputRef}
              showInputTask={showInputTask}
              time={datelocal}
              showinput={showinput}
              resetState={resetState}
              date={datelocal}
              dateDisp={dateDisp}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 20,
  },
  taskWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  menuicon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  items: {
    marginTop: 10,
    paddingHorizontal: 40,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "70%",
    backgroundColor: "#D3D3D3",
    borderRadius: 60,
    borderColor: "black",
    borderWidth: 1,
  },
  addText: {},
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "D3D3D3",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  arrowicon: {
    marginTop: 10,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 60,
    height: 50,
    alignItems: "center",
  },
  buttonback: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 35,
  },
  todaytitle: {
    marginTop: 5,
    height: 35,
  },
  buttoninput: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 5,
    marginHorizontal: 3,
    paddingRight: 10,
    paddingBottom: 10,
    // borderColor: "black",
    // borderWidth: 2,
    // borderRadius: 60,
  },
  buttonborder: {
    height: 70,
    width: 70,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
    borderRadius: 60,
  },
});

export default Home;
