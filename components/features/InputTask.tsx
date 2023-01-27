import React, { useState, useEffect, useRef } from "react";
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
import { addTask, triggerLoading } from "../../redux/taskSlice";
import {
  useDispatch,
  useSelector,
  Provider as ReduxProvider,
} from "react-redux";
import moment from "moment";
import { RootState } from "../../redux/store";
import { Entypo } from "@expo/vector-icons";
(moment as any).suppressDeprecationWarnings = true;

type Props = {
  showInputTask: (state: boolean) => void;
  resetState: () => void;
  time: Date;
  showinput: boolean;
  date: Date;
  dateDisp: boolean;
  ref: any;
};

type Newtask = {
  id: number | undefined;
  name: string;
  done: number;
  time: string;
  date: string;
};

const InputTask = React.forwardRef((props: Props, ref: any) => {
  const [task, setTask] = useState<string>("");
  const dispatch = useDispatch();
  const inputRefState = useSelector((state: RootState) => state.tasks.inputRef);

  const inputRef = React.createRef<any>();

  useEffect(() => {
    if (inputRefState) {
      inputRef.current.focus();
      console.log("ouiiii");
    }
  }, [inputRefState]);

  const dateDisplayed = useSelector(
    (state: RootState) => state.tasks.dateDisplayed
  );

  const handleAddTask = () => {
    Keyboard.dismiss();
    const dateCondition = (dateDisp: boolean) => {
      if (dateDisp) {
        return dateDisplayed;
      } else if (!dateDisp) {
        return dateToday(props.date);
      }
    };
    const dateToday = (date: Date) => moment(date).format("DD/MM/YYYY");
    const timeFormated = (time: Date) => moment(time).format("HH:mm");
    const newtask: Newtask = {
      id: undefined,
      name: task,
      done: 0,
      time: `${timeFormated(props.time)}` || `${timeFormated(new Date())}`,
      date: `${dateCondition(props.dateDisp)}`,
    };
    dispatch(addTask(newtask));
    dispatch(triggerLoading(true));
    setTask("");
    props.showInputTask(false);
    props.resetState();
  };

  console.log("test INPUT", inputRefState);

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          ref={inputRef}
          maxLength={30}
          style={styles.input}
          placeholder={"Add a task..."}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View>
            {/* <Text style={styles.addText}>+</Text> */}
            <Entypo name="add-to-list" size={50} color="black" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
});

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

////

// import React, { useState, useEffect, useRef } from "react";
// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Platform,
//   Keyboard,
// } from "react-native";
// import { addTask, triggerLoading } from "../../redux/taskSlice";
// import {
//   useDispatch,
//   useSelector,
//   Provider as ReduxProvider,
// } from "react-redux";
// import moment from "moment";
// import { RootState } from "../../redux/store";
// import { Entypo } from "@expo/vector-icons";
// (moment as any).suppressDeprecationWarnings = true;

// type Props = {
//   showInputTask: (state: boolean) => void;
//   resetState: () => void;
//   time: Date;
//   showinput: boolean;
//   date: Date;
//   dateDisp: boolean;
//   ref: any;
// };

// type Newtask = {
//   id: number | undefined;
//   name: string;
//   done: number;
//   time: string;
//   date: string;
// };

// const InputTask = React.forwardRef((props: Props, ref: any) => {
//   const [task, setTask] = useState<string>("");
//   const dispatch = useDispatch();

//   const dateDisplayed = useSelector(
//     (state: RootState) => state.tasks.dateDisplayed
//   );

//   const handleAddTask = () => {
//     Keyboard.dismiss();
//     const dateCondition = (dateDisp: boolean) => {
//       if (dateDisp) {
//         return dateDisplayed;
//       } else if (!dateDisp) {
//         return dateToday(props.date);
//       }
//     };
//     const dateToday = (date: Date) => moment(date).format("DD/MM/YYYY");
//     const timeFormated = (time: Date) => moment(time).format("HH:mm");
//     const newtask: Newtask = {
//       id: undefined,
//       name: task,
//       done: 0,
//       time: `${timeFormated(props.time)}` || `${timeFormated(new Date())}`,
//       date: `${dateCondition(props.dateDisp)}`,
//     };
//     dispatch(addTask(newtask));
//     dispatch(triggerLoading(true));
//     setTask("");
//     props.showInputTask(false);
//     props.resetState();
//   };

//   return (
//     <View>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.writeTaskWrapper}
//       >
//         <TextInput
//           // ref={taskInput}
//           maxLength={30}
//           style={styles.input}
//           placeholder={"Add a task..."}
//           value={task}
//           onChangeText={(text) => setTask(text)}
//         />
//         <TouchableOpacity onPress={() => handleAddTask()}>
//           <View>
//             {/* <Text style={styles.addText}>+</Text> */}
//             <Entypo name="add-to-list" size={50} color="black" />
//           </View>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </View>
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 50,
//   },
//   writeTaskWrapper: {
//     position: "absolute",
//     bottom: 0,
//     height: 90,
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "white",
//     borderTopWidth: 2,
//     borderTopColor: "black",
//   },
//   input: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     // paddingTop: 5,
//     width: "70%",
//     backgroundColor: "#D3D3D3",
//     borderRadius: 60,
//     borderColor: "black",
//     borderWidth: 1,
//   },
//   addText: {},
//   addWrapper: {
//     width: 60,
//     height: 60,
//     backgroundColor: "D3D3D3",
//     borderRadius: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     // fontSize: 100,
//   },
// });

// export default InputTask;
