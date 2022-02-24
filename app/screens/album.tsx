import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ScrollView,
  SafeAreaView,
  Image
} from "react-native";
import React, {useEffect, useState} from "react";
import * as MediaLibrary from "expo-media-library";

const Album = (props: any) => {
  const onPress = () => {};

  const [assets, setAssets] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let assets1 = await MediaLibrary.getAssetsAsync({
        album: props.route.params.catalogue,
        mediaType: "photo"
      });
      console.log(
        assets1.assets,
        "Here.........",
        props.route.params.catalogue
      );

      setAssets(assets1);
    })();
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
              {/* {assets.assets.map((item: any, index: any) => {
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
                      onPress={onPress}
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
                        <Image
                          source={{uri: item.uri}}
                          style={{width: 200, height: 200}}
                        />
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                );
              })} */}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Album;
