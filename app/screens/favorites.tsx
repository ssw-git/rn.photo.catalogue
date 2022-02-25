import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  LogBox,
  Dimensions
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React, {useEffect, useState} from "react";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import {storeData, getData} from "../util/handleData";
import ImageViewer from "react-native-image-zoom-viewer";
const {width, height} = Dimensions.get("window");

LogBox.ignoreLogs(["expo-permissions is now deprecated"]);

const Album = (props: any) => {
  const onPress = () => {};

  const [assets, setAssets] = useState<any>(null);
  const [showImage, setShowImage] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    (async () => {
      let favorites = await getData("favorites");
      setFavorites(favorites);
    })();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#ccd8de"}}>
      <View style={{flex: 1, flexDirection: "column"}}>
        <View
          style={{
            height: 90,
            backgroundColor: "#449dc9",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 35
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 20
            }}
          >
            Favorites
          </Text>
        </View>
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
                justifyContent: "flex-start",
                paddingTop: 5
              }}
            >
              {favorites != null &&
                favorites.map((item: any, index: any) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: width / 3 - 15,
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
                        onPress={() => {
                          setImgUrl(item);
                          setShowImage(true);
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
                          <Image
                            source={{uri: item}}
                            style={{width: 200, height: 200}}
                          />
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>
        <Modal
          animationType="fade"
          visible={showImage}
          transparent={true}
          onRequestClose={() => setShowImage(false)}
        >
          <View style={{flex: 1}}>
            <ImageViewer imageUrls={[{url: imgUrl}]} />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Album;
