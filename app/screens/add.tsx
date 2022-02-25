import {useState, useEffect} from "react";
import {StatusBar} from "expo-status-bar";
import {
  StyleSheet,
  LogBox,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  TouchableNativeFeedback
} from "react-native";
import {Button, Image, View, Platform, Dimensions} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import {storeData, getData} from "../util/handleData";
import catalogue from "./catalogue";
const {width, height} = Dimensions.get("window");

LogBox.ignoreLogs(["expo-permissions is now deprecated"]);

const Add = (props: any) => {
  const [image, setImage] = useState<any>(null);
  const [addNewText, setAddNewText] = useState<any>(null);

  const [albumVisible, setAlbumVisible] = useState<any>(false);

  const AddNewCatalogue = async () => {
    if (addNewText) {
      let catnew = {...props.catalogue};
      catnew[addNewText] = null;
      storeData("catalogue", catnew);
      props.setCatalogue(catnew);
    }
  };

  const addToAlbum = async (catalogue: any) => {
    const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (perm.status != "granted") {
      return;
    } else {
      const album = await MediaLibrary.getAlbumAsync(catalogue);

      const asset = await MediaLibrary.createAssetAsync(image);
      if (album === null) {
        const album_new = await MediaLibrary.createAlbumAsync(
          catalogue,
          asset,
          false
        );

        let catnew = {...props.catalogue};
        //@ts-ignore
        catnew[catalogue] = album_new.id;
        storeData("catalogue", catnew);
        props.setCatalogue(catnew);
      } else {
        let catnew = {...props.catalogue};
        //@ts-ignore
        catnew[catalogue] = album.id;
        storeData("catalogue", catnew);
        props.setCatalogue(catnew);

        const asset_add = await MediaLibrary.addAssetsToAlbumAsync(
          [asset],
          album,
          false
        );
      }
    }

    setAlbumVisible(false);
  };

  const pickImage = async () => {
    props.setVisible(false);

    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1
    });

    setAlbumVisible(true);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const captureImage = async () => {
    const perm = await Permissions.askAsync(Permissions.CAMERA);
    if (perm.status != "granted") {
      return;
    } else {
      props.setVisible(false);

      let result: any = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1
      });

      setAlbumVisible(true);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <View style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
          <View style={styles.modalView}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                //   justifyContent: "center",
                marginTop: 20,
                flexDirection: "column"
              }}
            >
              <View style={{flexDirection: "row"}}>
                <View
                  style={{
                    width: 110,
                    height: 100,
                    backgroundColor: "#449dc920",
                    borderRadius: 7,
                    overflow: "hidden",
                    alignItems: "center"
                  }}
                >
                  <TouchableNativeFeedback
                    useForeground={true}
                    onPress={captureImage}
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
                        Camera
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
                <View
                  style={{
                    width: 110,
                    height: 100,
                    backgroundColor: "#449dc920",
                    borderRadius: 7,
                    overflow: "hidden",
                    alignItems: "center",

                    marginLeft: 10
                  }}
                >
                  <TouchableNativeFeedback
                    useForeground={true}
                    onPress={pickImage}
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
                        Gallery
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>

              <View
                style={{
                  width: width / 3,
                  height: 40,
                  backgroundColor: "#449dc9",
                  borderRadius: 7,
                  overflow: "hidden",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 10
                }}
              >
                <TouchableNativeFeedback
                  useForeground={true}
                  onPress={() => props.setVisible(false)}
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
                        fontSize: 15,
                        fontWeight: "bold"
                      }}
                    >
                      Cancel
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              {/* {image && (
                <Image
                  source={{uri: image}}
                  style={{width: 200, height: 200}}
                />
              )} */}
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={albumVisible}>
        <View style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
            <View style={styles.albumModalView}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  //   justifyContent: "center",
                  marginTop: 20,
                  flexDirection: "column"
                }}
              >
                <View
                  style={{
                    padding: 5
                  }}
                >
                  <Text
                    style={{
                      color: "#449dc9",
                      fontSize: 16,
                      fontWeight: "bold"
                    }}
                  >
                    Select Catalogue
                  </Text>
                </View>
                <View
                  style={{flexDirection: "row", height: height / 1.5 - 200}}
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
                      {Object.keys(props.catalogue).map(
                        (item: any, index: any) => {
                          return (
                            <View
                              key={index}
                              style={{
                                width: 90,
                                height: 70,
                                backgroundColor: "#449dc920",
                                borderRadius: 7,
                                overflow: "hidden",
                                alignItems: "center",
                                marginTop: 10
                              }}
                            >
                              <TouchableNativeFeedback
                                useForeground={true}
                                onPress={() => addToAlbum(item)}
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
                                      fontSize: 12,
                                      fontWeight: "bold"
                                    }}
                                  >
                                    {item}
                                  </Text>
                                </View>
                              </TouchableNativeFeedback>
                            </View>
                          );
                        }
                      )}
                    </View>
                  </ScrollView>
                </View>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    height: 60,
                    alignItems: "center",
                    position: "absolute",
                    bottom: 80,
                    justifyContent: "space-evenly"
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      height: 40,
                      // backgroundColor: "#449dc9",
                      borderRadius: 7,
                      overflow: "hidden",
                      alignItems: "center"
                    }}
                  >
                    <TextInput
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 10,
                        height: 40,
                        width: "90%",
                        paddingLeft: 20,
                        marginLeft: 0
                      }}
                      selectTextOnFocus
                      onChangeText={(text) => setAddNewText(text)}
                      // value={comment}
                      placeholder="New Catalogue"
                      placeholderTextColor={`#00000090`}
                    />
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 40,
                      backgroundColor: "#449dc9",
                      borderRadius: 7,
                      overflow: "hidden",
                      alignItems: "center",
                      marginRight: 10
                    }}
                  >
                    <TouchableNativeFeedback
                      useForeground={true}
                      onPress={() => AddNewCatalogue()}
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
                            fontSize: 15,
                            fontWeight: "bold"
                          }}
                        >
                          Add New
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 1,
                    position: "absolute",
                    bottom: 70,
                    backgroundColor: "gray"
                  }}
                ></View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    height: 60,
                    alignItems: "center",
                    position: "absolute",
                    bottom: 10,
                    justifyContent: "space-evenly"
                  }}
                >
                  <View
                    style={{
                      width: width / 3,
                      height: 40,
                      backgroundColor: "#00000050",
                      borderRadius: 7,
                      overflow: "hidden",
                      alignItems: "center"
                    }}
                  >
                    <TouchableNativeFeedback
                      useForeground={true}
                      onPress={() => setAlbumVisible(false)}
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
                            fontSize: 15,
                            fontWeight: "bold"
                          }}
                        >
                          Cancel
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: 200,
    width: width / 1.5,
    marginLeft: width / 6,
    marginTop: height / 2,
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center"
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.55,
    // shadowRadius: 4,
    // elevation: 5
  },
  albumModalView: {
    height: height / 1.5,
    width: width / 1.2,
    marginLeft: width / 12,
    marginTop: height / 6,
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center"

    // elevation: 5
  }
});

export default Add;
