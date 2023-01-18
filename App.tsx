import React, { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./components/DrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import ViewDate from "./components/ViewDate";
import * as Notifications from "expo-notifications";
import { isDevice } from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

type RootStackParamList = {
  DrawerNavigator: undefined;
  ViewDate: { date: Date };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const App: React.FC = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [ExpoPushToken, setExpoPushToken] = useState<string | undefined>("");

  useEffect(() => {
    const getPermissions = async () => {
      let token;
      if (isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
          lockscreenVisibility:
            Notifications.AndroidNotificationVisibility.PUBLIC,
          bypassDnd: true,
        });
      }
      return token;
    };

    getPermissions().then((token) => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen name="ViewDate" component={ViewDate} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
