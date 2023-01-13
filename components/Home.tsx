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
import Task from "./features/Task";
import React, { useState } from "react";
import {
  useDispatch,
  useSelector,
  Provider as ReduxProvider,
} from "react-redux";
import { changeDateDisplay } from "../redux/taskSlice";
import { RootState } from "../redux/store";
import uuid from "react-native-uuid";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import InputTask from "./features/InputTask";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

type Newtask = {
  id: string;
  name: string;
  done: boolean;
  date: string;
};

const Home: React.FC = () => {
  const datelocal = new Date();
  const datelocalStr = moment(datelocal).format("DD/MM/YYYY");
  const dispatch = useDispatch();
  const dateFormated = new Date();
  const tasksArray = useSelector((state: RootState) => state.tasks.tasks);
  const dateDisplayed = useSelector(
    (state: RootState) => state.tasks.dateDisplayed
  );

  // const datecopy = new Date(dateDisplayed);
  const dayOftheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const IndexOfDay = moment(dateDisplayed, "DD/MM/YYYY").weekday();

  // console.log("date redux now", newd);

  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const [showinput, setShowinput] = useState<boolean>(false);

  const resetState = () => {};

  const showInputTask = () => {};

  const taskFiltered = tasksArray.filter((task) => task.date == dateDisplayed);

  const taskMapped = taskFiltered.map((task) => (
    <Task
      id={task.id}
      key={task.id}
      name={task.name}
      done={task.done}
      time={task.time}
      date={task.date}
    />
  ));

  return (
    <>
      <View style={styles.container}>
        <View style={styles.taskWrapper}>
          <View style={styles.menuicon}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AntDesign name="menufold" size={34} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>
            {datelocalStr == dateDisplayed ? `Today's tasks` : <></>}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.arrowicon}>
            <AntDesign
              onPress={() =>
                dispatch(
                  changeDateDisplay({ dateDisplayed, action: "subtract" })
                )
              }
              name="leftcircleo"
              size={30}
              color="black"
            />
            <Text>
              {dayOftheWeek[IndexOfDay]}, {dateDisplayed}
            </Text>
            <AntDesign
              onPress={() =>
                dispatch(changeDateDisplay({ dateDisplayed, action: "add" }))
              }
              name="rightcircleo"
              size={30}
              color="black"
            />
          </View>
          <View style={styles.items}>{taskMapped}</View>
        </ScrollView>
        <View>
          <InputTask
            showInputTask={showInputTask}
            time={datelocal}
            showinput={showinput}
            resetState={resetState}
            date={dateFormated}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  },
  menuicon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  items: {
    marginTop: 10,
    paddingHorizontal: 40,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
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
  },
  arrowicon: {
    marginTop: 10,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 60,
    height: 50,
    alignItems: "center",
  },
});

export default Home;
