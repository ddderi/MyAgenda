import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ViewDate from "./ViewDate";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import CalandarWrapper from "./CalandarWrapper";
import Settings from "./Settings";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import {
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { setDateDisplay } from "../redux/taskSlice";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import Statistic from "./Statistic";

const StackNavigatorCalendar = () => {
  type RootStackParamList = {
    CalendarWrapper: undefined;
    ViewDate: { date: Date };
  };

  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="CalendarWrapper"
        component={CalandarWrapper}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="ViewDate"
        component={ViewDate}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

const BottomNav = () => {
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const navigateToTasks = () => {
    navigation.navigate("Home");
    dispatch(setDateDisplay(moment(new Date()).format("DD/MM/YYYY")));
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 20,
          right: 20,
          borderRadius: 15,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            //<TouchableOpacity onPress={() => navigateToTasks()}>

            <FontAwesome5
              name="tasks"
              size={focused ? 30 : 22}
              color={focused ? "tomato" : "black"}
            />
            // </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={StackNavigatorCalendar}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            return (
              <AntDesign
                name="calendar"
                size={focused ? 30 : 22}
                color={focused ? "tomato" : "black"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={Statistic}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo name="add-to-list" size={50} color="black" />
          ),
          tabBarButton: (props) => (
            <View style={styles.buttoninput}>
              <TouchableOpacity>
                {/* <TouchableOpacity onPress={() => inputRef.current.focus()}> */}

                {/* <TouchableOpacity onPress={() => setInputDisplay(true)}> */}
                <View style={styles.buttonborder}>
                  <Entypo name="add-to-list" size={50} color="white" />
                  {/* <Entypo name="add-to-list" size={50} color="white" /> */}
                </View>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={Statistic}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="user"
              size={focused ? 30 : 22}
              color={focused ? "tomato" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="settings"
              size={focused ? 30 : 22}
              color={focused ? "tomato" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <BottomNav />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  buttoninput: {
    top: -30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // elevation: 5,
  },
  buttonborder: {
    height: 70,
    width: 70,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
    borderRadius: 60,
    elevation: 5,
  },
});

export default AppNavigator;
