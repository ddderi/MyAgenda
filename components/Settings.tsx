import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import * as Notification from "expo-notifications";

type Props = {};

// type State = {
//     content: NotificationContentInput,
//     trigger: NotificationTriggerInput
// }

const Settings = (props: Props) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const handleNotifications = () => {
    Notification.scheduleNotificationAsync({
      content: {
        title: "Local notifications",
        body: "this is my local notifications",
      },
      trigger: {
        seconds: 3,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <View style={styles.menuicon}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <AntDesign name="menufold" size={34} color="black" />
          </TouchableOpacity>
        </View>
        <Button title="Open notification" onPress={handleNotifications} />
      </View>
    </View>
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
  menuicon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default Settings;
