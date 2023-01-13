import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Checkbox from "./Checkbox";
import { deleteTask, changeDone } from "../../redux/taskSlice";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import moment, { Moment } from "moment/moment.js";

type Tasktodelete = {
  id: string;
  name: string;
  done: boolean;
  time: string;
  date: string;
};

const Task: React.FC<{
  name: string;
  done: boolean;
  id: string;
  time: string;
  date: string;
}> = ({ name, done, id, time, date }) => {
  const dispatch = useDispatch();

  const handleDeletetask = () => {
    const taskTodelete: Tasktodelete = {
      id: id,
      name: name,
      done: done,
      time: time,
      date: date,
    };
    dispatch(deleteTask(taskTodelete));
  };

  const ChangeDone = () => {
    const taskTodelete: Tasktodelete = {
      id: id,
      name: name,
      done: done,
      time: time,
      date: date,
    };
    dispatch(changeDone(taskTodelete));
  };

  const dateFormated = (date: Date | string) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <TouchableOpacity onPress={() => ChangeDone()}>
      <View>
        <Text>{time}</Text>

        {/* {dateFormated(date) !== dateFormated(new Date()) ? (
          <Text>{date}</Text>
        ) : (
          <></>
        )} */}
        <View style={done ? styles.containerdone : styles.container}>
          <View style={styles.itemLeft}>
            <Checkbox done={done} id={id} name={name} />
            {/* <TouchableOpacity style={styles.square} ></TouchableOpacity> */}
            <Text style={styles.task}>{name}</Text>
          </View>
          <View style={done ? styles.iconbin : styles.iconhid}>
            <TouchableOpacity onPress={() => handleDeletetask()}>
              <Ionicons name="ios-trash-bin-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#acc8d7",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  containerdone: {
    backgroundColor: "#DFF5CE",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  task: {
    maxWidth: "80%",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  iconbin: {
    display: "flex",
  },
  iconhid: {
    display: "none",
  },
});

export default Task;
