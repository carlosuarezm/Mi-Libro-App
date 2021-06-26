import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import iconCamera from '../assets/camera.png'
import iconLogOut from '../assets/logout.png'
import iconLogIn from '../assets/login2.png'
import AppLoading from 'expo-app-loading'
import BookContext from '../context/Book/BookContext.js'
import AsyncStorage from '../utils/storage'
import UserContext from '../context/User/UserContext.js';
import fetchFont from '../styles/fonts.js'
import {stylesHome} from '../styles/HomeStyles.js'


const Home = ({ navigation }) => {
    const { booksHistory, setBooksHistory } = useContext(BookContext)
    const { state, setUserAuthenticated } = useContext(UserContext)

    //Boton LOGOUT
    async function logOut() {
        await AsyncStorage.clearData('@userData', '@booksHistory');
        // setBooksHistory(null)
        setUserAuthenticated(null)
        navigation.navigate('Login')
    }

    //Fuentes
    const [fontLoaded, setFontLoaded] = useState(false)

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFont}
            onError={() => console.log("ERROR")}
            onFinish={() => {
                setFontLoaded(true)
            }}
        />
    }

    function renderHeader() {

        return (
            <>
                {/* Saludo */}
                {state && state.payload
                    ?
                    <>
                        <View style={stylesHome.headerLoggedIn}>
                            <Text style={stylesHome.headerGreeting}>Hola</Text>
                            <Text style={stylesHome.headerText}>{state.payload.name}</Text>
                        </View>

                        <TouchableOpacity style={stylesHome.touchButtonHeader} onPress={logOut}>
                            <View style={stylesHome.touchImageButtonHeader}>
                                <Image source={iconLogOut} resizeMode='contain' style={{ width: 20, height: 20 }} />
                            </View>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <View style={stylesHome.headerLoggedIn}>
                            <Text style={stylesHome.headerGreeting}>Hola</Text>
                            <Text style={stylesHome.headerText}>¡Que tengas un buen día!</Text>
                        </View>

                        <TouchableOpacity style={stylesHome.touchButtonHeader} onPress={() => navigation.navigate('Login')}>
                            <View style={stylesHome.touchImageButtonHeader}>
                                <Image source={iconLogIn} resizeMode='contain' style={{ width: 28, height: 28 }} />
                            </View>
                        </TouchableOpacity>
                    </>
                }
            </>
        )
    }

    function renderMyBookSection() {

        return (
            <>
                {/* Header */}
                <View style={stylesHome.headerBookSection}>
                    <Text style={stylesHome.textHeaderBookSection}>Mi última busqueda</Text>
                </View>

                {/* Books */}
                {booksHistory === null || booksHistory.id === undefined

                    ?
                    <View style={stylesHome.booksContainer}>
                        <Text style={stylesHome.textBooks}>
                            No tiene búsquedas recientes.
                        </Text>
                        <Text style={stylesHome.textBooks}>
                            ¡Realice una búsqueda!
                        </Text>
                    </View>

                    :
                    <View style={stylesHome.bookContainer}>
                        <TouchableOpacity
                            style={stylesHome.touchBook}
                            onPress={() => navigation.navigate("BookDetails", {
                                book: booksHistory
                            })}
                        >
                            {/* Book Cover */}
                            <Image source={booksHistory.bookCover} resizeMode='contain' style={stylesHome.imageBook} />

                            {/* Book Info */}
                            <View style={stylesHome.bookInfoContainer}>
                                <Text style={stylesHome.textBookInfo}>{booksHistory.author}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
    }

    function renderCameraSection() {

        return (
            <>
                {/* Camera */}
                <TouchableOpacity style={stylesHome.touchCamera} onPress={() => navigation.navigate("Camera")}>
                    <View style={stylesHome.cameraContainer}>
                        <View style={stylesHome.imageCameraContainer}>
                            <Image source={iconCamera} resizeMode='contain' style={stylesHome.imageCamera} />
                        </View>

                        <Text style={stylesHome.textCamera}>Buscar</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }


    return (
        <SafeAreaView style={stylesHome.containerHome}>
            {/* Header Section */}
            <View style={stylesHome.containerHeaderSection}>
                {renderHeader()}
            </View>
            {/* Books Section */}
            <View style={stylesHome.containerBooksSection}>
                {renderMyBookSection()}
            </View>
            {/* Camera Section */}
            <View style={stylesHome.containerCameraSection}>
                {renderCameraSection()}
            </View>
        </SafeAreaView>
    )
}

export default Home