import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { Component } from "react";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputTask from "./features/InputTask";
import {
  setDateDisplay,
  setInputRef,
  addTask,
  triggerLoading,
} from "../redux/taskSlice";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  navigation: any;
  setDateDisplay: any;
  inputDisplayRef: any;
  setInputRef: (bool: boolean) => void;
  addTask: (arg0: Newtask) => void;
  triggerLoading: (bool: boolean) => void;
}

type Newtask = {
  id: number | undefined;
  name: string;
  done: number;
  time: string;
  date: string;
};

type State = {
  selectedStartDate: any;
  time: Date;
  show: boolean;
  text: string;
  showinput: boolean;
  dateDisplayed: boolean;
  task: string;
};

export class Calendar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedStartDate: new Date(),
      time: new Date(),
      show: false,
      text: "None",
      showinput: false,
      dateDisplayed: false,
      task: "",
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.showInputTask = this.showInputTask.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  inputRef = React.createRef<any>();

  resetState() {
    this.setState({
      time: new Date(),
      show: false,
      text: "None",
      showinput: false,
    });
  }

  handleChangeText(text: string) {
    this.setState({
      task: text,
    });
  }

  showTimePicker(state: boolean) {
    this.setState({
      show: state,
    });
  }

  showInputTask(state: boolean) {
    this.setState({
      showinput: state,
    });
  }

  onDateChange(date: any) {
    this.setState({
      selectedStartDate: date,
    });
  }

  openTime(value: boolean) {
    this.setState({
      show: value,
    });
  }

  handleAddTask() {
    Keyboard.dismiss();
    const timeFormated = (time: Date) => moment(time).format("HH:mm");
    const newtask: Newtask = {
      id: undefined,
      name: this.state.task,
      done: 0,
      time: `${timeFormated(this.state.time)}` || `${timeFormated(new Date())}`,
      date: `${moment(this.state.selectedStartDate).format("DD/MM/YYYY")}`,
    };
    this.props.addTask(newtask);
    this.props.triggerLoading(true);
    this.props.setInputRef(false);
    this.handleChangeText("");
  }

  onChangeTime(event: any, value: Date | any) {
    let formatedTempTime = moment(value).format("HH:mm");
    this.setState({
      time: value,
      text: formatedTempTime,
      show: false,
      showinput: true,
    });
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    setTimeout(() => {
      if (this.props.inputDisplayRef) {
        this.inputRef.current.focus();
      }
    }, 500);
  }

  render() {
    const dateDispViewDate = moment(this.state.selectedStartDate).format(
      "DD/MM/YYYY"
    );

    const navigateToDate = () => {
      navigation.navigate("ViewDate", {
        date: dateDispViewDate,
      });
      this.props.setDateDisplay(dateDispViewDate);
    };

    const minDate = new Date();
    const { navigation } = this.props;
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate : "";
    return (
      <View style={styles.container}>
        <View style={styles.calandarCont}>
          <CalendarPicker
            onDateChange={this.onDateChange}
            minDate={minDate}
            selectedDayColor="#2196f3"
          />
        </View>
        <View style={styles.bottomCont}>
          <View style={styles.bottomContChild}>
            <View style={styles.bottomContLeft}>
              <Text>SELECTED DATE: </Text>
              <Text>{moment(startDate).format("DD/MM/YYYY")}</Text>
            </View>
            <View style={styles.bottomContRight}>
              <Fontisto
                onPress={() => navigateToDate()}
                name="zoom-plus"
                size={34}
                color="black"
              />
            </View>
          </View>
          <View style={styles.bottomContChild}>
            <View style={styles.bottomContLeft}>
              <Text>SELECTED TIME: </Text>
              <Text>{this.state.text}</Text>
            </View>
            <View style={styles.bottomContRight}>
              <Button title="Select Time" onPress={() => this.openTime(true)} />
            </View>
          </View>
        </View>
        <View>
          {this.state.show && (
            <DateTimePicker
              value={this.state.time}
              mode="time"
              display={"default"}
              is24Hour={true}
              minuteInterval={30}
              onChange={this.onChangeTime}
            />
          )}
        </View>
        {this.props.inputDisplayRef && (
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.writeTaskWrapper}
            >
              <TextInput
                ref={this.inputRef}
                maxLength={30}
                style={styles.input}
                placeholder={"Add a task..."}
                // to change
                value={this.state.task}
                onChangeText={(text) => this.handleChangeText(text)}
                autoFocus={true}
                // need to be set
                onBlur={() => this.props.setInputRef(false)}
              />
              <View>
                <View
                  style={{
                    position: "absolute",
                    right: -20,
                    bottom: -30,
                  }}
                >
                  <TouchableOpacity onPress={() => this.handleAddTask()}>
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
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  inputDisplayRef: state.tasks.inputRef,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setDateDisplay: (dateDispViewDate: string) => {
      dispatch(setDateDisplay(dateDispViewDate));
    },
    setInputRef: (bool: boolean) => {
      dispatch(setInputRef(bool));
    },
    addTask: (newtask: Newtask) => {
      dispatch(addTask(newtask));
    },
    triggerLoading: (bool: boolean) => {
      dispatch(triggerLoading(bool));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

const styles = StyleSheet.create({
  writeTaskWrapper: {
    elevation: 10,
    position: "absolute",
    bottom: 90,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E3E4E7",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
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
  menuicon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 50,
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
  calandarCont: {
    marginTop: 20,
  },
  bottomCont: {
    flexDirection: "column",
    width: "100%",
  },
  bottomContChild: {
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  bottomContLeft: {
    width: "50%",

    flexDirection: "row",
    justifyContent: "flex-start",
  },
  bottomContRight: {
    paddingTop: 10,
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
  },
});
