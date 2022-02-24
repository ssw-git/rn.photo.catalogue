import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import React from "react";

const Catalogue = (props: any) => {
  const onPress = (catalogue: any) => {
    props.navigation.navigate("Album", {catalogue: catalogue});
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ccd8de",
        flexDirection: "column",
        padding: 3
      }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            //   backgroundColor: "red",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            paddingTop: 5
          }}
        >
          {Object.keys(props.catalogue).map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  width: 110,
                  height: 100,
                  backgroundColor: "#449dc920",
                  borderRadius: 7,
                  overflow: "hidden",
                  alignItems: "center",
                  marginTop: 10
                }}
              >
                <TouchableNativeFeedback
                  useForeground={true}
                  onPress={() => onPress(item)}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5
                    }}
                  >
                    <Text
                      style={{
                        color: "#449dc9",
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Catalogue;
