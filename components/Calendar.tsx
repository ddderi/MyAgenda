import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputTask from "./features/InputTask";

interface Props {
  navigation: any;
}

type State = {
  selectedStartDate: any;
  time: Date;
  show: boolean;
  text: string;
  showinput: boolean;
  dateDisplayed: boolean;
};

const datenow = new Date();
const dateToday = moment();

export default class Calendar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedStartDate: new Date(),
      // selectedStartDate: moment(dateToday, "DD-MM-YYYY"),
      // selectedStartDate: moment(dateToday, "DD-MM-YYYY").add(1, "days"),
      time: new Date(),
      show: false,
      text: "None",
      showinput: false,
      dateDisplayed: false,
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.showInputTask = this.showInputTask.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      time: new Date(),
      show: false,
      text: "None",
      showinput: false,
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
      show: true,
    });
  }

  onChangeTime(event: any, value: Date | any) {
    // let formatedTempTime = value.getHours() + " : " + value.getMinutes();
    let formatedTempTime = moment(value).format("HH:mm");
    this.setState({
      time: value,
      text: formatedTempTime,
      show: false,
      showinput: true,
    });
  }

  render() {
    const minDate = new Date();
    const { navigation } = this.props;
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate : "";
    return (
      <View style={styles.container}>
        <View style={styles.taskWrapper}>
          <View style={styles.menuicon}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AntDesign name="menufold" size={34} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Calandar</Text>
        </View>
        <View style={styles.calandarCont}>
          <CalendarPicker
            onDateChange={this.onDateChange}
            minDate={minDate}
            selectedDayColor="#acc8d7"
          />
        </View>
        <View style={{ marginLeft: 30, flexDirection: "column" }}>
          <View style={{ marginLeft: 30, flexDirection: "row" }}>
            <Text>SELECTED DATE: </Text>
            <Text style={{ marginLeft: 30 }}>
              {moment(startDate).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View style={{ marginLeft: 30, flexDirection: "row" }}>
            <Text>SELECTED TIME: </Text>
            <Text style={{ marginLeft: 30 }}>{this.state.text}</Text>
          </View>
        </View>
        <View>
          {this.state.show && (
            <DateTimePicker
              style={styles.datePicker}
              value={this.state.time}
              mode="time"
              display={"default"}
              is24Hour={true}
              minuteInterval={30}
              onChange={this.onChangeTime}
            />
          )}
        </View>
        {this.state.showinput && (
          <InputTask
            showInputTask={this.showInputTask}
            time={this.state.time}
            showinput={this.state.showinput}
            resetState={this.resetState}
            date={this.state.selectedStartDate}
            dateDisp={this.state.dateDisplayed}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuicon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  taskWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    // textAlign: 'center',
  },
  calandarCont: {
    marginTop: 20,
  },
  datePicker: {},
});
