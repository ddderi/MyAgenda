import React from "react";
import Calendar from "./Calendar";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

const CalandarWrapper = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return <Calendar navigation={navigation} />;
};

export default CalandarWrapper;
