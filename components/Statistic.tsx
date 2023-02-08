import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  loadCompletedTasks,
  loadPendingTasks,
  triggerLoading,
} from "../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import * as SQLite from "expo-sqlite";
import { RootState } from "../redux/store";
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
} from "react-native-responsive-linechart";

type Props = {};

const Statistic = (props: Props) => {
  const db = SQLite.openDatabase("todos.db");
  const dispatch = useDispatch();
  const completedTasks = useSelector(
    (state: RootState) => state.tasks.tasksCompleted
  );
  const pendingTasks = useSelector(
    (state: RootState) => state.tasks.tasksPending
  );
  const stateLoaded = useSelector(
    (state: RootState) => state.tasks.needToBeLoaded
  );

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ?",
        [1],
        (txObj, resultSet: any) => {
          dispatch(loadCompletedTasks(resultSet.rows._array));
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      let x: any = null;
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ?",
        [0],
        (txObj, resultSet: any) => {
          dispatch(loadPendingTasks(resultSet.rows._array));
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });
  }, []);

  useEffect(() => {
    if (stateLoaded === true) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ?",
          [1],
          (txObj, resultSet: any) => {
            dispatch(loadCompletedTasks(resultSet.rows._array));
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        let x: any = null;
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ?",
          [0],
          (txObj, resultSet: any) => {
            dispatch(loadPendingTasks(resultSet.rows._array));
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      dispatch(triggerLoading(false));
    }
  }, [stateLoaded]);

  const data1 = [
    { x: -2, y: 1 },
    { x: -1, y: 0 },
    { x: 8, y: 13 },
    { x: 9, y: 11.5 },
    { x: 10, y: 12 },
  ];

  const data2 = [
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <Text style={styles.title}>Tasks Overview</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.topLeft}>
          <Text style={styles.numberStyle}>{completedTasks.length}</Text>
          <Text style={{ fontFamily: "sans-serif", fontSize: 16 }}>
            Completed Tasks
          </Text>
        </View>
        <View style={styles.topRight}>
          <Text style={styles.numberStyle}>{pendingTasks.length}</Text>
          <Text style={{ fontFamily: "sans-serif", fontSize: 16 }}>
            Pending Tasks
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Chart
          style={{ height: 220, width: "100%", backgroundColor: "#eee" }}
          xDomain={{ min: 0, max: 10 }}
          yDomain={{ min: 0, max: 20 }}
          padding={{ left: 20, top: 10, bottom: 20, right: 10 }}
        >
          <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
          <HorizontalAxis tickCount={3} />
          <Line
            data={data1}
            smoothing="none"
            theme={{ stroke: { color: "red", width: 1 } }}
          />
          <Line
            data={data2}
            smoothing="cubic-spline"
            theme={{ stroke: { color: "blue", width: 1 } }}
          />
        </Chart>
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
    fontFamily: "sans-serif",
    fontSize: 22,
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
    height: "15%",
    marginTop: 20,
    justifyContent: "space-between",
  },
  bottom: {
    // height: "15%",
    marginTop: 20,
    // borderRadius: 15,
    // elevation: 8,
  },
});

export default Statistic;
