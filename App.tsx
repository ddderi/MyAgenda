import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./components/DrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import ViewDate from "./components/ViewDate";

type RootStackParamList = {
  DrawerNavigator: undefined;
  ViewDate: { date: Date };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const App: React.FC = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

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
          {/* <DrawerNavigator /> */}
        </RootStack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
