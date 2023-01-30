import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {};

const Statistic = (props: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <Text>Tasks Overview</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.topLeft}>
          <Text>0</Text>
          <Text>Completed Tasks</Text>
        </View>
        <View style={styles.topRight}>
          <Text>0</Text>
          <Text>Pending Tasks</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text>bottom</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
    // justifyContent: "space-evenly",
    height: "100%",
    paddingHorizontal: 30,
  },
  top: {
    backgroundColor: "#acc8d7",
    height: "5%",
    marginTop: 20,
    borderRadius: 15,
    paddingLeft: 10,
  },
  topLeft: {
    width: "45%",
    backgroundColor: "#acc8d7",
    borderRadius: 15,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 5,
  },
  topRight: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "45%",
    backgroundColor: "#acc8d7",
    borderRadius: 15,
    paddingBottom: 5,
  },
  middle: {
    flexDirection: "row",
    // backgroundColor: "#acc8d7",
    height: "15%",
    marginTop: 20,
    // borderRadius: 15,
    justifyContent: "space-between",
  },
  bottom: {
    backgroundColor: "#acc8d7",
    height: "15%",
    marginTop: 20,
    borderRadius: 15,
  },
});

export default Statistic;
