import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Feather as Icon } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const CameraUse = () => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const camRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();

  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture() {

    if (camRef) {
      // const options = {quality: 0.5, base64: true, skipProcessing: false}
      const data = await camRef.current.takePictureAsync()
      setCapturedPhoto(data.uri)
      setOpen(true)
      console.log(data)
    }
  }

  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
      .then(() => {
        alert('Saved!!')
      })
      .catch(error => {
        console.log('err', error)
      })
  }


  return (
    //****vamos de nuevo*********************** */
    <View style={styles.container}>
      <Camera
        ratio={"16:9"}
        style={{ flex: 1 }}
        type={type}
        ref={camRef}
      >
        <View style={{ flex: 1, flexDireccion: "row", backgroundColor: "transparent", }}>

          <TouchableOpacity
            style={{ position: 'absolute', bottom: 20, left: 20 }}
            // style={{position: 'absolute', bottom:20 , left:20}}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Icon name="refresh-ccw" size={50} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            // style={styles.button}
            // style={{position: 'absolute', bottom:20 , left:100}}
            style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}
            onPress={takePicture}>
            <Icon name="aperture" size={50} color="white" />
          </TouchableOpacity>

          {capturedPhoto &&
            <Modal
              animationType="slide"
              transparent={false}
              visible={open}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                <View style={{ margin: 10, flexDirection: 'row' }}>

                  <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                    <FontAwesome name="window-close" size={25} color="#FF0000" />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ margin: 10 }} onPress={savePicture}>
                    <FontAwesome name="upload" size={25} color="#121212" />
                  </TouchableOpacity>

                </View>
                <Image
                  style={{ width: '100%', height: 300, borderRadius: 20 }}
                  source={{ uri: capturedPhoto }}
                />
              </View>
            </Modal>
          }

        </View>
      </Camera>
    </View>

  );
}

const styles = StyleSheet.create({
  // container: {flex:1},
  container: { flex: 1, justifyContent: 'center' },
  // camera: {flex:1},
  buttonContainer: { flex: 1, backgroundColor: 'transparent', flexDirection: 'row' },
  button: { flex: 1, alignSelf: 'flex-end', alignItems: 'center' },
  // text: { fontSize:18, marginBottom:10, color: 'white'}

});

export default CameraUse