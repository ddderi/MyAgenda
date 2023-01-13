import * as React from 'react';
import Home from './Home';

import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import { ParamListBase } from '@react-navigation/native';
import CalandarWrapper from './CalandarWrapper';

// type DrawerListComp = {
// name: string,

// }

export default function DrawerNavigator() {

    const Drawer = createDrawerNavigator<ParamListBase>();

    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{ headerShown: false }} initialRouteName="Home" >
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='Calendar' component={CalandarWrapper} />
        </Drawer.Navigator>
    );
}
