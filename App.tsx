import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./components/DrawerNavigator";

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
