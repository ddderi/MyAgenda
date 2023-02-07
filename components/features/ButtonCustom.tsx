import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { setDateDisplay } from "../../redux/taskSlice";
import moment from "moment";
import { useDispatch } from "react-redux";

const ButtonCustom = () => {
  const dispatch = useDispatch();

  return (
    <Pressable
      style={styles.button}
      onPress={() =>
        dispatch(setDateDisplay(moment(new Date()).format("DD/MM/YYYY")))
      }
    >
      <View style={styles.buttonfeatures}>
        <View>
          <Entypo name="back" size={24} color="black" />
        </View>
        <View>
          <Text style={styles.text}>Back</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: "white",
    height: 35,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  buttonback: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 35,
  },
  buttonfeatures: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default ButtonCustom;
