import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator, Image, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import { Feather as Icon } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { reconocerPorTexto } from "../utils/ApiTextoReqs.js";
import { buscador } from "../utils/ApiLibro.js";
import iconUpload from '../assets/upload3.png'
import iconSwitchCamera from '../assets/switchcamera2.png'
import iconTakeAPicture from '../assets/takeapicture.png'

import book1 from '../assets/cleancode.jpg'

import AsyncStorage from "../utils/storage.js";
import BookContext from '../context/Book/BookContext.js'


export default function CameraTest({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [miCamera, setMiCamera] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const { booksHistory, setBooksHistory } = useContext(BookContext)

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
            setIsLoading(true)
            //console.log(photo)
            if (photo) {
                let uri = photo.uri.split(".")
                let format = uri[uri.length - 1]
                let newFile = {
                    uri: photo.uri,
                    type: `test/${format}`,
                    name: `test.${format}`

                }
                //console.log('New File',newFile)
                await handleUpload(newFile)

            }
        }
    }

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            alert('Permission to access media library is required ')
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync()
        //console.log('1-', pickerResult)

        if (pickerResult.cancelled === true) {
            return;
        }
        setIsLoading(true)
        let uri = pickerResult.uri.split(".")
        let format = uri[uri.length - 1]
        let newFile = {
            uri: pickerResult.uri,
            type: `test/${format}`,
            name: `test.${format}`

        }

        await handleUpload(newFile)
    }

    const handleUpload = async (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'Prueba_LibroApp')
        data.append("cloud_name", "carlosuarezm")

        const res = await axios.post('https://api.cloudinary.com/v1_1/carlosuarezm/image/upload', data)
        let libro;

        try {
            if (!res.data.url) {
               throw new Error('Error en la carga de imagen')
            }
    
            const text = await reconocerPorTexto(res.data.url)
            if (!text) {
                throw new Error('Error inesperado intente de nuevo')
            }
    
            libro = await buscador.libroPorReconocimiento(text)
            if (!libro) {
                throw new Error('Libro no encontrado')
            }    
        } catch (error) {
            alert(error.message)
            setIsLoading(false)
            return navigation.navigate('Home')
        }

        const book = {
            id: libro.id,
            publishedDate: libro.publishedDate ? libro.publishedDate : 'N/A',
            bookName: libro.title,
            bookCover: { uri: libro.imageLinks.thumbnail },
            rating: libro.averageRating != null ? libro.averageRating : 'N/A',
            pageNo: libro.pageCount ? libro.pageCount : 'N/A',
            author: libro.authors[0],
            description: libro.description ? libro.description : 'No se ha encontrado descripción del libro solicitado.',
            backgroundColor: 'rgba(240, 240, 232, 0.9)',
            navTintColor: '#000'
        }

        //Recordar agregar la lógica que si el libro que se buscó ya está guardado, que no se guarde
        // fillBooksHistory(book)
        // await AsyncStorage.storeData('@booksHistory', book)

        if (booksHistory) {
            const existeElLibro = booksHistory.id === book.id ? true : false

            if (!existeElLibro) {
                setBooksHistory(book)
                await AsyncStorage.storeData(`@booksHistory`, book)
            }
        }

        navigation.replace('BookDetails', { book })
    }



    //const CameraView = () => ()

    return (
        !isLoading ?
            (<View style={styles.container}>
                <Camera style={styles.camera} type={type} ratio={'16:9'}
                    ref={ref => {
                        setMiCamera(ref);
                    }}>
                </Camera>
                <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: "#1E1B26", justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity
                        // style={{ position: 'absolute', bottom: 20, left: 20 }}
                        style={{left:20, backgroundColor:'#FFFFFF', borderRadius: 25, padding:1}}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Image
                            source={iconSwitchCamera}
                            resizeMode='contain'
                            style={{
                                width: 48,
                                height: 48
                            }}
                        />
                        {/* <Icon name="refresh-ccw" size={50} color="white" /> */}
                    </TouchableOpacity>

                    <TouchableOpacity
                        // style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}
                        onPress={takePhoto}>
                        <Image
                            source={iconTakeAPicture}
                            resizeMode='contain'
                            style={{
                                width: 60,
                                height: 60
                            }}
                        />
                        {/* <Icon name="aperture" size={50} color="white" /> */}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{right:20, backgroundColor:'#FFFFFF', borderRadius: 25}}
                        // style={{ position: 'absolute', bottom: 20, right: 20 }}
                        onPress={openImagePickerAsync}>
                        <Image
                            source={iconUpload}
                            resizeMode='contain'
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />
                        {/* <Icon name="upload" size={50} color="white" /> */}
                    </TouchableOpacity>
                </View>

            </View>)
            :

            <View style={{ flex: 1, justifyContent: "center", flexDirection: "row", padding: 10, backgroundColor: '#1E1B26' }}>
                <ActivityIndicator size="large" color="#FFFFFF" ></ActivityIndicator>
            </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginTop: StatusBar.currentHeight 
    },
    camera: {
        flex: 0.8,
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

