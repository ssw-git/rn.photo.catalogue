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
      const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (perm.status != "granted") {
        return;
      } else {
        if (props.route.params.id != null) {
          let assets1 = await MediaLibrary.getAssetsAsync({
            album: props.route.params.id,
            mediaType: "photo"
          });

          setAssets(assets1);
        }
      }

      let favorites = await getData("favorites");
      setFavorites(favorites);
    })();
  }, []);

  const AddToFavorites = async (uri: string) => {
    let fav1 = [...favorites];
    //@ts-ignore
    fav1.push(uri);
    storeData("favorites", fav1);

    setFavorites(fav1);
  };

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
            {props.route.params.catalogue}
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
              {assets != null &&
                assets.assets.map((item: any, index: any) => {
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
                          AddToFavorites(item.uri);
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            width: 35,
                            height: 35,
                            // backgroundColor: "red",
                            zIndex: 100,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <AntDesign
                            name={
                              //@ts-ignore
                              favorites.includes(item.uri) ? "star" : "staro"
                            }
                            size={20}
                            style={{
                              color: "#cc631d"
                            }}
                          />
                        </View>
                      </TouchableNativeFeedback>

                      <TouchableNativeFeedback
                        useForeground={true}
                        onPress={() => {
                          setImgUrl(item.uri);
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
                            source={{uri: item.uri}}
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
