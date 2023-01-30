import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Keyboard,
} from "react-native";
import Task from "./features/Task";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDateDisplay,
  triggerLoading,
  addTask,
  setInputRef,
} from "../redux/taskSlice";
import { RootState } from "../redux/store";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
import ButtonCustom from "./features/ButtonCustom";
import { Ionicons } from "@expo/vector-icons";

type Newtask = {
  id: number | undefined;
  name: string;
  done: number;
  time: string;
  date: string;
};

type Props = {
  route: any;
};

const ViewDate = (props: Props) => {
  const datelocal = new Date();
  const [inputDisplay, setInputDisplay] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());
  const [task, setTask] = useState<string>("");
  const [taskFilled, setTaskFilled] = useState<boolean>(false);

  const datelocalStr = moment(datelocal).format("DD/MM/YYYY");
  const dispatch = useDispatch();
  const tasksArray = useSelector((state: RootState) => state.tasks.tasks);
  const dateDisplayed = useSelector(
    (state: RootState) => state.tasks.dateDisplayed
  );

  const inputDisplayRef = useSelector(
    (state: RootState) => state.tasks.inputRef
  );

  const dayOftheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const IndexOfDay = moment(dateDisplayed, "DD/MM/YYYY").weekday();

  const taskFiltered = tasksArray.filter((task) => task.date == dateDisplayed);
  // console.log("iam in view date", props.route);
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

  const onChangeTime = (event: any, value: Date | any) => {
    setTime(value);
    setShow(false);
    setTaskFilled(true);
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    setShow(true);
  };

  useEffect(() => {
    if (taskFilled) {
      const timeFormated = (time: Date) => moment(time).format("HH:mm");
      const newtask: Newtask = {
        id: undefined,
        name: task,
        done: 0,
        time: `${timeFormated(time)}`,
        date: `${dateDisplayed}`,
      };
      dispatch(addTask(newtask));
      dispatch(triggerLoading(true));
      setTask("");
      setTaskFilled(false);
    }
  }, [taskFilled]);

  const inputRef = useRef<any>("");
  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    if (inputDisplayRef) {
      focusInput();
    }
  }, [inputDisplayRef, inputRef]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.taskWrapper}>
          {datelocalStr == dateDisplayed ? (
            <View style={styles.todaytitle}>
              <Text style={styles.sectionTitle}>Today's tasks</Text>
            </View>
          ) : (
            <View style={styles.buttonback}>{/* <ButtonCustom /> */}</View>
          )}
        </View>
        <ScrollView>
          {/* <View style={styles.arrowicon}>
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
          </View> */}
          <View style={styles.items}>{taskMapped}</View>
        </ScrollView>
        {inputDisplayRef && (
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.writeTaskWrapper}
            >
              <TextInput
                ref={inputRef}
                maxLength={30}
                style={styles.input}
                placeholder={"Add a task..."}
                value={task}
                onChangeText={(text) => setTask(text)}
                autoFocus={true}
                onBlur={() => dispatch(setInputRef(false))}
              />
              <View>
                <View
                  style={{
                    position: "absolute",
                    right: -20,
                    bottom: -30,
                  }}
                >
                  <TouchableOpacity onPress={() => handleAddTask()}>
                    <Ionicons
                      name="arrow-up-circle"
                      size={55}
                      color="#2196f3"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        )}

        {/* {!inputDisplay && (
          <View style={styles.buttoninput}>
            <TouchableOpacity onPress={() => setInputDisplay(true)}>
              <View style={styles.buttonborder}>
                <Entypo name="add-to-list" size={50} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )}
        {inputDisplay && (
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.writeTaskWrapper}
            >
              <TextInput
                style={styles.input}
                placeholder={"Add a task..."}
                value={task}
                onChangeText={(text) => setTask(text)}
              />
              <TouchableOpacity onPress={() => handleAddTask()}>
                <View>
                  <Entypo name="add-to-list" size={50} color="black" />
                </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        )} */}
        <View>
          {show && (
            <DateTimePicker
              style={styles.datePicker}
              value={time}
              mode="time"
              display={"default"}
              is24Hour={true}
              minuteInterval={30}
              onChange={onChangeTime}
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 1,
  },
  writeTaskWrapper: {
    elevation: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E3E4E7",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  // writeTaskWrapper: {
  //   position: "absolute",
  //   bottom: 60,
  //   width: "100%",
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   alignItems: "center",
  // },
  input: {
    bottom: 0,
    elevation: 10,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "#E3E4E7",
    borderWidth: 1,
  },
  addText: {
    marginTop: 0,
    fontSize: 30,
  },
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
  datePicker: {},
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

export default ViewDate;
