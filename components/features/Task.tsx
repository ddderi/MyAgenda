import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Checkbox from "./Checkbox";
import { deleteTask, changeDone, triggerLoading } from "../../redux/taskSlice";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
(moment as any).suppressDeprecationWarnings = true;
import moment from "moment";

type Tasktodelete = {
  id: number | undefined;
  name: string;
  done: number;
  time: string;
  date: string;
};

const Task: React.FC<{
  name: string;
  done: number;
  id: number | undefined;
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
    dispatch(triggerLoading(true));
  };

  return (
    <TouchableOpacity onPress={() => ChangeDone()}>
      <View>
        <Text>{moment(time, "hh:mm A").format("hh:mm A")}</Text>
        <View style={done === 1 ? styles.containerdone : styles.container}>
          <View style={styles.itemLeft}>
            <Checkbox done={done} id={id} name={name} time={time} date={date} />
            {/* <TouchableOpacity style={styles.square} ></TouchableOpacity> */}
            <Text style={styles.task}>{name}</Text>
          </View>
          <View style={done === 1 ? styles.iconbin : styles.iconhid}>
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
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 8,
  },
  containerdone: {
    backgroundColor: "#DFF5CE",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 8,
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
