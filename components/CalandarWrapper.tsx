import React from 'react';
import { View } from 'react-native';
import Calendar from './Calendar';
import {
    useNavigation,
    ParamListBase
} from "@react-navigation/native";
import {
    DrawerNavigationProp
} from "@react-navigation/drawer";

type Props = {}

const CalandarWrapper = (props: Props) => {

const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()

  return (
        <Calendar  navigation={navigation} />
  )
}

export default CalandarWrapper