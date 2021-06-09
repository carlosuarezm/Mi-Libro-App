import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Feather as Icon } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function CameraTest() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [miCamera, setMiCamera] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePhoto = async () => {
        if (miCamera) {
            let photo = await miCamera.takePictureAsync();
            setSelectedImage(photo)
            console.log(photo)
        }
    }

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
       
        if (permissionResult.granted === false){
          alert('Permission to access media library is required ')
          return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync()
        console.log('1-',pickerResult)
    
        if(pickerResult.cancelled === true){
          return;
        }
        setSelectedImage({localUri: pickerResult.uri})
        console.log(selectedImage)
    } 
    
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ratio={'16:9'}
                ref={ref => {
                    setMiCamera(ref);
                }}>
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
                        onPress={takePhoto}>
                        <Icon name="aperture" size={50} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        // style={styles.button}
                        // style={{position: 'absolute', bottom:20 , left:100}}
                        style={{ position: 'absolute', bottom: 20, right: 20 }}
                        onPress={openImagePickerAsync}>
                        <Icon name="upload" size={50} color="white" />
                    </TouchableOpacity>
                </View>

                    



                {/* <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            if (miCamera) {
                                let photo = await miCamera.takePictureAsync();
                                console.log(photo)
                            }
                        }}>
                        <Text style={styles.text}> Take </Text>
                    </TouchableOpacity>
                </View> */}
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

