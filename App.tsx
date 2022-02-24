import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableNativeFeedback
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import Catalogue from "./app/screens/catalogue";
import Add from "./app/screens/add";
import Album from "./app/screens/album";
import {storeData, getData} from "./app/util/handleData";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const HomeScreen = (props: any) => {
  const onPress = () => {};
  const [visible, setVisible] = useState<any>(false);

  const [catalogue, setCatalogue] = useState<any>({portrait: [], abstract: []});

  const getCatalogue = async () => {
    let catalogue = await getData("catalogue");

    if (!catalogue) {
      storeData("catalogue", {portrait: [], abstract: []});

      setCatalogue({portrait: [], abstract: []});
    } else {
      setCatalogue(catalogue);
    }
  };

  useEffect(() => {
    getCatalogue();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#ccd8de"}}>
      <View style={{flex: 1, flexDirection: "column"}}>
        <View
          style={{
            height: 90,
            backgroundColor: "#449dc9",
            flexDirection: "row"
          }}
        ></View>
        <Catalogue catalogue={catalogue} navigation={props.navigation} />
        <Add
          visible={visible}
          setVisible={setVisible}
          catalogue={catalogue}
          setCatalogue={setCatalogue}
        />
        <View
          style={{
            height: 60,
            backgroundColor: "#449dc9",
            flexDirection: "row",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}
        >
          <View
            style={{
              height: 60,
              flex: 1
            }}
          >
            <TouchableNativeFeedback
              useForeground={true}
              onPress={() => setVisible(true)}
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
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold"
                  }}
                >
                  Add
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            headerShown: false
          })}
        />
        <Stack.Screen
          name="Album"
          component={Album}
          options={() => ({
            headerShown: false
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
