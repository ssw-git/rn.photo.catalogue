import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableNativeFeedback
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import Catalogue from "./app/screens/catalogue";
import Add from "./app/screens/add";
import Album from "./app/screens/album";
import Favorites from "./app/screens/favorites";
import {storeData, getData} from "./app/util/handleData";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
//@ts-ignore
import Logo from "./app/assets/logo.png";

const HomeScreen = (props: any) => {
  const onPress = () => {};
  const [visible, setVisible] = useState<any>(false);

  const [catalogue, setCatalogue] = useState<any>({
    Portrait: null,
    Abstract: null
  });

  const getCatalogue = async () => {
    let catalogue = await getData("catalogue");

    if (!catalogue) {
      storeData("catalogue", {
        Portrait: null,
        Abstract: null
      });

      storeData("favorites", []);

      setCatalogue({
        Portrait: null,
        Abstract: null
      });
    } else {
      setCatalogue(catalogue);
    }
  };

  useEffect(() => {
    getCatalogue();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#ccd8de20"}}>
      <View style={{flex: 1, flexDirection: "column"}}>
        <View
          style={{
            height: 90,
            backgroundColor: "#449dc9",
            flexDirection: "row",
            paddingTop: 50,
            paddingLeft: 10
          }}
        >
          <Image
            source={Logo}
            style={{width: 130, height: 40, resizeMode: "contain"}}
          />
        </View>
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
        <Stack.Screen
          name="Favorites"
          component={Favorites}
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
