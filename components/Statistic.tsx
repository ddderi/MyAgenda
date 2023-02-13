import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  loadCompletedTasks,
  loadPendingTasks,
  triggerLoading,
} from "../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import * as SQLite from "expo-sqlite";
import { RootState } from "../redux/store";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";

const Statistic = () => {
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

  const [numberCompleted, setNumberCompleted] = useState([0, 0, 0, 0, 0]);
  const [numberPending, setNumberPending] = useState([0, 0, 0, 0, 0]);

  let mergeArray = [
    ...numberCompleted,
    ...numberPending,
    completedTasks.length,
    pendingTasks.length,
  ];

  const determineYMax = (arr: number[]) => {
    let highestY = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > highestY) {
        highestY = arr[i];
      }
    }
    return highestY;
  };

  const IndexOfDay = moment(new Date()).format("DD/MM/YYYY");
  const dayPast = (day: number) =>
    moment(IndexOfDay, "DD/MM/YYYY").subtract(day, "days").format("DD/MM");

  const [selectedDateRef, setSelectedDateRef] = useState(IndexOfDay);

  // const IndexOfDay = moment(new Date()).format("DD/MM");
  const dayPastDynamic = (day: number) =>
    moment(selectedDateRef, "DD/MM/YYYY").subtract(day, "days").format("DD/MM");

  useEffect(() => {
    const today = moment(new Date()).format("DD/MM/YYYY");
    const dayPast = (day: number) =>
      moment(today, "DD/MM/YYYY").subtract(day, "days").format("DD/MM/YYYY");

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [1, today],
        (txObj, resultSet: any) => {
          dispatch(loadCompletedTasks(resultSet.rows._array));
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [0, today],
        (txObj, resultSet: any) => {
          dispatch(loadPendingTasks(resultSet.rows._array));
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    let copyNumberCompleted = [0, 0, 0, 0, 0];
    let copyNumberPending = [0, 0, 0, 0, 0];

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [1, dayPast(1)],
        (txObj, resultSet: any) => {
          copyNumberCompleted[4] = resultSet.rows._array.length;
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [1, dayPast(2)],
        (txObj, resultSet: any) => {
          copyNumberCompleted[3] = resultSet.rows._array.length;
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [1, dayPast(3)],
        (txObj, resultSet: any) => {
          copyNumberCompleted[2] = resultSet.rows._array.length;
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [1, dayPast(4)],
        (txObj, resultSet: any) => {
          copyNumberCompleted[1] = resultSet.rows._array.length;
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [1, dayPast(5)],
        (txObj, resultSet: any) => {
          copyNumberCompleted[0] = resultSet.rows._array.length;
          setNumberCompleted(copyNumberCompleted);
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [0, dayPast(1)],
        (txObj, resultSet: any) => {
          copyNumberPending[4] = resultSet.rows._array.length;
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [0, dayPast(2)],
        (txObj, resultSet: any) => {
          copyNumberPending[3] = resultSet.rows._array.length;
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [0, dayPast(3)],
        (txObj, resultSet: any) => {
          copyNumberPending[2] = resultSet.rows._array.length;
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [0, dayPast(4)],
        (txObj, resultSet: any) => {
          copyNumberPending[1] = resultSet.rows._array.length;
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE done = ? AND date = ?",
        [0, dayPast(5)],
        (txObj, resultSet: any) => {
          copyNumberPending[0] = resultSet.rows._array.length;
          setNumberPending(copyNumberPending);
        },
        (_, error): boolean | any => {
          console.warn(error);
        }
      );
    });
  }, []);

  useEffect(() => {
    if (stateLoaded === true) {
      const dayPast = (day: number) =>
        moment(selectedDateRef, "DD/MM/YYYY")
          .subtract(day, "days")
          .format("DD/MM/YYYY");

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [1, dayPast(0)],
          (txObj, resultSet: any) => {
            dispatch(loadCompletedTasks(resultSet.rows._array));
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [0, dayPast(0)],
          (txObj, resultSet: any) => {
            dispatch(loadPendingTasks(resultSet.rows._array));
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      let copyNumberCompleted = [0, 0, 0, 0, 0];
      let copyNumberPending = [0, 0, 0, 0, 0];

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [1, dayPast(1)],
          (txObj, resultSet: any) => {
            copyNumberCompleted[4] = resultSet.rows._array.length;
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [1, dayPast(2)],
          (txObj, resultSet: any) => {
            copyNumberCompleted[3] = resultSet.rows._array.length;
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [1, dayPast(3)],
          (txObj, resultSet: any) => {
            copyNumberCompleted[2] = resultSet.rows._array.length;
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [1, dayPast(4)],
          (txObj, resultSet: any) => {
            copyNumberCompleted[1] = resultSet.rows._array.length;
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [1, dayPast(5)],
          (txObj, resultSet: any) => {
            copyNumberCompleted[0] = resultSet.rows._array.length;
            setNumberCompleted(copyNumberCompleted);
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [0, dayPast(1)],
          (txObj, resultSet: any) => {
            copyNumberPending[4] = resultSet.rows._array.length;
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [0, dayPast(2)],
          (txObj, resultSet: any) => {
            copyNumberPending[3] = resultSet.rows._array.length;
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [0, dayPast(3)],
          (txObj, resultSet: any) => {
            copyNumberPending[2] = resultSet.rows._array.length;
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [0, dayPast(4)],
          (txObj, resultSet: any) => {
            copyNumberPending[1] = resultSet.rows._array.length;
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todos WHERE done = ? AND date = ?",
          [0, dayPast(5)],
          (txObj, resultSet: any) => {
            copyNumberPending[0] = resultSet.rows._array.length;
            setNumberPending(copyNumberPending);
          },
          (_, error): boolean | any => {
            console.warn(error);
          }
        );
      });

      dispatch(triggerLoading(false));
    }
  }, [stateLoaded]);

  const refreshData = (itemValue: string) => {
    setSelectedDateRef(itemValue);
    dispatch(triggerLoading(true));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <Text style={styles.title}>Tasks Overview</Text>
      </View>
      <View style={styles.select}>
        <View>
          <Picker
            selectedValue={selectedDateRef}
            onValueChange={(itemValue, itemIndex) => refreshData(itemValue)}
          >
            <Picker.Item label="Today" value={IndexOfDay} />
            <Picker.Item label="Yesterday" value={dayPast(1)} />
            <Picker.Item label={dayPast(2)} value={dayPast(2)} />
            <Picker.Item label={dayPast(3)} value={dayPast(3)} />
            <Picker.Item label={dayPast(4)} value={dayPast(4)} />
          </Picker>
        </View>
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
        <LineChart
          data={{
            labels: [
              `${dayPastDynamic(5)}`,
              `${dayPastDynamic(4)}`,
              `${dayPastDynamic(3)}`,
              `${dayPastDynamic(2)}`,
              `${dayPastDynamic(1)}`,
              `${moment(selectedDateRef, "DD/MM/YYYY").format("DD/MM")}`,
            ],
            datasets: [
              {
                color: (opacity = 1) => `rgba(60, 179, 113, ${opacity})`,
                data: [...numberCompleted, completedTasks.length],
              },
              {
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                data: [...numberPending, pendingTasks.length],
              },
            ],
          }}
          width={Dimensions.get("window").width - 29}
          height={280}
          segments={determineYMax(mergeArray)}
          fromZero={true}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#acc8d7",
            backgroundGradientFrom: "#acc8d7",
            backgroundGradientTo: "#acc8d7",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(60, 179, 113, ${opacity})`,

            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {},
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#acc8d7",
            },
          }}
          bezier
          style={{
            elevation: 3,
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    marginTop: 5,
    width: "38%",
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    height: "100%",
    paddingHorizontal: 15,
  },
  top: {
    backgroundColor: "#acc8d7",
    height: 50,
    marginTop: 10,
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
    fontSize: 35,
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
    marginTop: 5,
    justifyContent: "space-between",
  },
  bottom: {
    marginTop: 10,
  },
});

export default Statistic;

//BarChart

//           const [numberCompleted, setNumberCompleted] = useState([0, 0, 0, 0, 0]);
// const [numberPending, setNumberPending] = useState([0, 0, 0, 0, 0]);
//   data: [
//     [numberCompleted[0], numberPending[0]],
//     [numberCompleted[1], numberPending[1]],
//     [numberCompleted[2], numberPending[2]],
//     [numberCompleted[3], numberPending[3]],
//     [numberCompleted[4], numberPending[4]],
//     [completedTasks.length, pendingTasks.length],
//   ],
//   barColors: ["green", "red"],
//   legend: ["Tasks completed", "Tasks uncompleted/pending"],

//   // datasets: [
//   //   {
//   //     color: (opacity = 1) => `rgba(60, 179, 113, ${opacity})`,
//   //     data: [...numberCompleted, completedTasks.length],
//   //   },
//   //   {
//   //     color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
//   //     data: [...numberPending, pendingTasks.length],
//   //   },
//   // ],
// }}
// width={Dimensions.get("window").width - 25} // from react-native
// height={280}
// fromZero={true}
// yAxisLabel=""
// yAxisSuffix=""
// hideLegend={true}
// segments={7}
// // formatYLabel={() => yLabelIterator.next().value}
// formatYLabel={() => yLabelIterator.next().value}
// yAxisInterval={5} // optional, defaults to 1
// chartConfig={{
//   barPercentage: 0.4,
//   backgroundColor: "#acc8d7",
//   backgroundGradientFrom: "#acc8d7",
//   backgroundGradientTo: "#acc8d7",
//   decimalPlaces: 2, // optional, defaults to 2dp
//   color: (opacity = 1) => `rgba(60, 179, 113, ${opacity})`,

//   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   style: {
//     // borderRadius: 16,
//     marginVertical: 8,
//     marginRight: 10,
//     // paddingRight: 10,
//   },
//   propsForDots: {
//     r: "6",
//     strokeWidth: "2",
//     stroke: "#acc8d7",
//   },
// }}
// // bezier
// style={{
//   elevation: 8,
//   // marginVertical: 8,
//   // marginRight: 10,
//   paddingRight: 10,
//   borderRadius: 16,
// }}
