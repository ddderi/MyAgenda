import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Switch,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import * as Notification from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
(moment as any).suppressDeprecationWarnings = true;

const Settings = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const [timeString, setTimeString] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const handleNotifications = async (hour: number, minute: number) => {
    if (isEnabled) {
      const id = await Notification.scheduleNotificationAsync({
        content: {
          title: "Local notifications",
          body: "this is my local notifications",
          data: {
            data: "data goes here",
          },
        },
        trigger: {
          hour: hour,
          minute: minute,
          repeats: true,
        },
      });
      const idNotif = await AsyncStorage.setItem("IDNOTIF", id);

      return idNotif;
    }
  };

  const toggleSwitch = () => {
    if (!isEnabled) {
      setShow(true);
    } else if (isEnabled) {
      const cancelNotif = async () => {
        try {
          let IdNotif: any = await AsyncStorage.getItem("IDNOTIF");

          // Pour supprimer une Notifications specifique

          // await Notification.cancelScheduledNotificationAsync(IdNotif);
          await Notification.cancelAllScheduledNotificationsAsync();
        } catch (error) {
          console.log("error deleting id", error);
        }
      };
      cancelNotif();
      AsyncStorage.removeItem("IDNOTIF");
    }
    setIsEnabled((previousState) => !previousState);
  };

  const onChangeTime = async (event: any, value: Date | any) => {
    setTime(value);
    setShow(false);

    let formatedTemp = moment(value).format("HH:mm");
    let formatedHour = moment(value).format("HH");
    let formatedMinute = moment(value).format("mm");
    setTimeString(formatedTemp);
    handleNotifications(parseInt(formatedHour), parseInt(formatedMinute));
    await AsyncStorage.setItem("TIMENOTIF", formatedTemp);
  };

  useEffect(() => {
    async function getToken() {
      try {
        const valueTime: any = await AsyncStorage.getItem("TIMENOTIF");
        const valueId = await AsyncStorage.getItem("IDNOTIF");
        if (valueId !== null) {
          setIsEnabled(true);
          setTimeString(valueTime);
        } else {
          setIsEnabled(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.toggle}>
          <Text style={{ fontFamily: "sans-serif", fontSize: 18 }}>
            Notifications
          </Text>
          <View style={{ width: "45%" }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={styles.options}>
          <Text style={{ fontFamily: "sans-serif", fontSize: 18 }}>
            Reminder tasks :
          </Text>

          <View style={styles.iconstyle}>
            <View style={{ paddingRight: 5 }}>
              <Text
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {!isEnabled ? "Disabled" : timeString}
              </Text>
            </View>
            <Ionicons
              name="ios-time-outline"
              size={30}
              color="black"
              onPress={() => setShow(true)}
            />
          </View>
        </View>
        <View>
          {show && (
            <DateTimePicker
              value={time}
              mode="time"
              display={"default"}
              is24Hour={true}
              minuteInterval={1}
              onChange={onChangeTime}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    height: "100%",
    paddingHorizontal: 15,
  },
  top: {
    backgroundColor: "#acc8d7",
    height: 50,
    marginBottom: 20,
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
  taskWrapper: {
    marginTop: 50,
    flexDirection: "column",
    backgroundColor: "#acc8d7",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderRadius: 15,
    paddingBottom: 25,
  },
  menuicon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  options: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  toggle: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconstyle: {
    marginLeft: 10,
    marginRight: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperOptions: {
    flexDirection: "column",
  },
  wrapper: {
    backgroundColor: "#acc8d7",
    paddingHorizontal: 10,
    borderRadius: 15,
    paddingBottom: 20,
    elevation: 8,
  },
});

export default Settings;
