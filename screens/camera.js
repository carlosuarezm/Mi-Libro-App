import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { Feather as Icon } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { reconocerPorTexto } from "../utils/ApiTextoReqs.js";
import { buscador } from "../utils/ApiLibro.js";


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

        if (!res.data.url) {
            return alert('Error en la carga de imagen')
        }
        //console.log('Imagen en cloudnary')
        const text = await reconocerPorTexto(res.data.url)
        if (!text) {
            return alert('Error inesperado intente de nuevo')
        }
        //console.log('Texto reconocido', text)
        const libro = await buscador.libroPorReconocimiento(text)
        if (!libro) {
            return alert('Libro no encontrado')
        }
        //console.log('Libro encontrado')
        //console.log(libro)
        const book = {
            id: libro.id,
            publishedDate: libro.publishedDate,
            bookName: libro.title,
            bookCover: { uri: libro.imageLinks.thumbnail },
            rating: libro.averageRating != null ? libro.averageRating : 'N/A',
            pageNo: libro.pageCount,
            author: libro.authors[0],
            description: libro.description,
            backgroundColor: 'rgba(240, 240, 232, 0.9)',
            navTintColor: '#000'
        }

        //Recordar agregar la lógica que si el libro que se buscó ya está guardado, que no se guarde
        // fillBooksHistory(book)
        // await AsyncStorage.storeData('@booksHistory', book)

        if(booksHistory){
            const existeElLibro = booksHistory.id === book.id ? true : false

            if(!existeElLibro){
                setBooksHistory(book)
                await AsyncStorage.storeData(`@booksHistory`, book)
            }
        }


            
        setIsLoading(false)
        navigation.navigate('BookDetails', { book })
    }



    //const CameraView = () => ()

    return (
        !isLoading ?
            (<View style={styles.container}>
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
                            style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}
                            onPress={takePhoto}>
                            <Icon name="aperture" size={50} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ position: 'absolute', bottom: 20, right: 20 }}
                            onPress={openImagePickerAsync}>
                            <Icon name="upload" size={50} color="white" />
                        </TouchableOpacity>
                    </View>
                </Camera>

            </View>)
            :
            <Modal onRequestClose={() => null} visible={true}>
                <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}>
                    <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
                        <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
                        <ActivityIndicator size="large" />
                    </View>
                </View>
            </Modal>
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

