import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { reconocerPorTexto } from "../utils/ApiTextoReqs.js";
import { buscador } from "../utils/ApiLibro.js";
import iconUpload from '../assets/images/gallery.png'
import iconSwitchCamera from '../assets/images/switchcamera2.png'
import iconTakeAPicture from '../assets/images/takeapicture.png'
import AsyncStorage from "../utils/storage.js";
import BookContext from '../context/Book/BookContext.js'
import { stylesCamera } from '../styles/CameraStyles.js';
import imageDefault from '../assets/images/bookcoverdefault.jpeg'


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

            if (photo) {
                let uri = photo.uri.split(".")
                let format = uri[uri.length - 1]
                let newFile = {
                    uri: photo.uri,
                    type: `test/${format}`,
                    name: `test.${format}`
                }
                await handleUpload(newFile)
            }
        }
    }

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            Alert.alert('¡Lo sentimos!', 'Permission to access media library is required ', [{text: 'ok'}])
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync()

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
            Alert.alert('¡Lo sentimos!', error.message, [{text: 'ok'}])
            setIsLoading(false)
            return navigation.navigate('Home')
        }

        const book = {
            id: libro.id,
            publishedDate: libro.publishedDate ? libro.publishedDate : 'N/A',
            bookName: libro.title ? libro.title : 'N/A',
            bookCover: libro.imageLinks ? { uri: libro.imageLinks.thumbnail } : imageDefault,
            rating: libro.averageRating != null ? libro.averageRating : 'N/A',
            pageNo: libro.pageCount ? libro.pageCount : 'N/A',
            author: libro.authors ? libro.authors[0] : 'N/A',
            description: libro.description ? libro.description : 'No se ha encontrado descripción del libro solicitado.',
            backgroundColor: 'rgba(240, 240, 232, 0.9)',
            navTintColor: '#000'
        }

        if (booksHistory) {
            const existeElLibro = booksHistory.id === book.id ? true : false

            if (!existeElLibro) {
                setBooksHistory(book)
                await AsyncStorage.storeData(`@booksHistory`, book)
            }
        }
        //Para eliminar de la pila de screens a la pantalla cargando, porque si vamos para atras luego de buscar vuelve ahi
        navigation.replace('BookDetails', { book })
    }

    return (
        !isLoading ?
            (<View style={stylesCamera.containerCamera}>
                <Camera style={stylesCamera.camera} type={type} ratio={'16:9'}
                    ref={ref => {
                        setMiCamera(ref);
                    }}>
                </Camera>

                <View style={stylesCamera.containerButtonsCamera}>
                    <TouchableOpacity
                        style={stylesCamera.touchSwitchCamera}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Image source={iconSwitchCamera} resizeMode='contain' style={stylesCamera.imageSwitchCamera} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={takePhoto}>
                        <Image source={iconTakeAPicture} resizeMode='contain' style={stylesCamera.imageTakePhoto} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={stylesCamera.touchGallery}
                        onPress={openImagePickerAsync}>
                        <Image source={iconUpload} resizeMode='contain' style={stylesCamera.imageGallery}/>
                    </TouchableOpacity>
                </View>
            </View>)
            :

            <View style={stylesCamera.containerLoading}>
                <ActivityIndicator size="large" color="#FFFFFF" ></ActivityIndicator>
            </View>
    );
}

