import React, { Component, useState, useEffect, useRef } from "react";
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
import { Entypo } from "@expo/vector-icons";
import {
  useDispatch,
  useSelector,
  Provider as ReduxProvider,
} from "react-redux";
import { RootState } from "../redux/store";
import moment from "moment";
(moment as any).suppressDeprecationWarnings = true;
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addTask, triggerLoading } from "../redux/taskSlice";

type Props = {
  showInputTask: (state: boolean) => void;
  resetState: () => void;
  time: Date;
  showinput: boolean;
  date: Date;
  dateDisp: boolean;
  // forwardedRef: any;
  addTask: any;
  triggerLoading: any;
};

type Newtask = {
  id: number | undefined;
  name: string;
  done: number;
  time: string;
  date: string;
};

type State = {
  task: string;
};

const dateDisplayed = useSelector(
  (state: RootState) => state.tasks.dateDisplayed
);

export class InputTaskTest extends Component<Props, State, Newtask> {
  state = {
    task: "",
  };

  handleTask(text: string) {
    this.setState({
      task: text,
    });
  }

  handleAddTask() {
    Keyboard.dismiss();
    const dateCondition = (dateDisp: boolean) => {
      if (dateDisp) {
        return dateDisplayed;
      } else if (!dateDisp) {
        return dateToday(this.props.date);
      }
    };
    const dateToday = (date: Date) => moment(date).format("DD/MM/YYYY");
    const timeFormated = (time: Date) => moment(time).format("HH:mm");
    const newtask: Newtask = {
      id: undefined,
      name: this.state.task,
      done: 0,
      time: `${timeFormated(this.props.time)}` || `${timeFormated(new Date())}`,
      date: `${dateCondition(this.props.dateDisp)}`,
    };
    this.props.addTask(newtask);
    this.props.triggerLoading(true);
    this.setState({
      task: "",
    });
    // setTask("");
    this.props.showInputTask(false);
    this.props.resetState();
  }

  render() {
    return (
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            // ref={inputRef}
            maxLength={30}
            style={styles.input}
            placeholder={"Add a task..."}
            value={this.state.task}
            onChangeText={(text) => this.handleTask(text)}
          />
          <TouchableOpacity onPress={() => this.handleAddTask()}>
            <View>
              <Entypo name="add-to-list" size={50} color="black" />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTask: (newtask: any) => {
      dispatch(addTask(newtask));
    },
    triggerLoading: (trigger: boolean) => {
      dispatch(triggerLoading(trigger));
    },
  };
};

export default connect(null, mapDispatchToProps)(InputTaskTest);

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
