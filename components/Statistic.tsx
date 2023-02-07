import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {};

const Statistic = (props: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <Text style={styles.title}>Tasks Overview</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.topLeft}>
          <Text style={styles.numberStyle}>0</Text>
          <Text>Completed Tasks</Text>
        </View>
        <View style={styles.topRight}>
          <Text style={styles.numberStyle}>0</Text>
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
    marginTop: 20,
    // justifyContent: "space-evenly",
    height: "100%",
    paddingHorizontal: 15,
  },
  top: {
    backgroundColor: "#acc8d7",
    height: 50,
    marginTop: 20,
    borderRadius: 15,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  numberStyle: {
    fontSize: 50,
  },
  topLeft: {
    width: "45%",
    backgroundColor: "#acc8d7",
    borderRadius: 15,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 5,
    elevation: 8,
  },
  topRight: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "45%",
    backgroundColor: "#acc8d7",
    borderRadius: 15,
    paddingBottom: 5,
    elevation: 8,
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
    elevation: 8,
  },
});

export default Statistic;
