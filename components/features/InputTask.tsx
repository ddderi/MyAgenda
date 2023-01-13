import React, { useState } from "react";
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
import { addTask } from "../../redux/taskSlice";
import {
  useDispatch,
  useSelector,
  Provider as ReduxProvider,
} from "react-redux";
import uuid from "react-native-uuid";
import moment from "moment";
(moment as any).suppressDeprecationWarnings = true;

type Props = {
  showInputTask: (state: boolean) => void;
  resetState: () => void;
  time: Date;
  showinput: boolean;
  date: Date;
};

type Newtask = {
  id: string;
  name: string;
  done: boolean;
  time: string;
  date: string;
};

const InputTask = (props: Props) => {
  const [task, setTask] = useState<string>("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    Keyboard.dismiss();
    const dateToday = (date: Date) => moment(date).format("DD/MM/YYYY");
    const timeFormated = (time: Date) => moment(time).format("HH:mm");
    const newtask: Newtask = {
      id: `${uuid.v4()}`,
      name: task,
      done: false,
      time: `${timeFormated(props.time)}` || `${timeFormated(new Date())}`,
      date: `${dateToday(props.date)}` || `${dateToday(new Date())}`,
      // totalDate(props.date, props.date, props.date) ||
      // totalDate(new Date(), new Date(), new Date()),
    };
    dispatch(addTask(newtask));
    setTask("");
    props.showInputTask(false);
    props.resetState();
  };

  return (
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
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    height: 90,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 2,
    borderTopColor: "black",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    // paddingTop: 5,
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
    // fontSize: 100,
  },
});

export default InputTask;
