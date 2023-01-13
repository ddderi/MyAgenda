import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export interface Props {
  // navigation: () => DrawerContentComponentProps
  state: any;
  navigation: any;
  descriptors: any;
}

const CustomDrawer: React.FC<Props> = (props: Props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://via.placeholder.com/50.png/09f/fff%20C/O%20https://placeholder.com/",
          }}
          style={{ width: 50, height: 50, borderRadius: 30 }}
        />
        <Text style={{ marginTop: 20 }}>Todo list App</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  logo: {},
});

export default CustomDrawer;
