import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions
} from "react-native";
import React from "react";

const {width, height} = Dimensions.get("window");

const Catalogue = (props: any) => {
  const onPress = (catalogue: any) => {
    props.navigation.navigate("Album", {
      catalogue: catalogue,
      id: props.catalogue[catalogue]
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ccd8de20",
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
            paddingTop: 5
          }}
        >
          <View
            key={0}
            style={{
              width: width / 3 - 18,
              height: 100,
              backgroundColor: "#cca53950",
              borderRadius: 7,
              overflow: "hidden",
              alignItems: "center",
              marginTop: 10,
              marginLeft: 10
            }}
          >
            <TouchableNativeFeedback
              useForeground={true}
              onPress={() => {
                props.navigation.navigate("Favorites", {});
              }}
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
                    color: "#cc631d",
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  Favorites
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          {Object.keys(props.catalogue).map((item: any, index: any) => {
            return (
              <View
                key={index + 1}
                style={{
                  width: width / 3 - 18,
                  height: 100,
                  backgroundColor: "#449dc920",
                  borderRadius: 7,
                  overflow: "hidden",
                  alignItems: "center",
                  marginTop: 10,
                  marginLeft: 10
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
