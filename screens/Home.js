import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import iconCamera from '../assets/images/camera.png'
import iconLogOut from '../assets/images/logout.png'
import iconLogIn from '../assets/images/login2.png'
import AppLoading from 'expo-app-loading'
import BookContext from '../context/Book/BookContext.js'
import AsyncStorage from '../utils/storage'
import UserContext from '../context/User/UserContext.js';
import fetchFont from '../styles/fonts.js'
import { stylesHome } from '../styles/HomeStyles.js'
import { logOutFavorites } from "../persistenciaFavs/db.js";


const Home = ({ navigation }) => {
    const { booksHistory, setBooksHistory } = useContext(BookContext)
    const { state, setUserAuthenticated } = useContext(UserContext)

    async function logOut() {
        await AsyncStorage.clearData();
        setBooksHistory({})
        setUserAuthenticated(null)
        logOutFavorites()
        navigation.navigate('Login')
    }

    const [fontLoaded, setFontLoaded] = useState(false)

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFont}
            onError={() => console.log("ERROR en FONT")}
            onFinish={() => {
                setFontLoaded(true)
            }}
        />
    }

    function renderHeader() {

        return (
            <>
                {/* Saludo */}
                {state
                    ?
                    <View style={{flexDirection:'row'}}>
                        <View style={stylesHome.headerImageLoggedIn}>
                            <Image source={{uri: state.photoUrl}} resizeMode='cover' style={stylesHome.imagePhotoUrl} />
                        </View>
                        <View style={stylesHome.headerLoggedIn}>
                            <Text style={stylesHome.headerGreeting}>Hola</Text>
                            <Text style={stylesHome.headerText}>{state.name}</Text>
                        </View>

                        <TouchableOpacity style={stylesHome.touchButtonHeader} onPress={logOut}>
                            <View style={stylesHome.touchImageButtonHeader}>
                                <Image source={iconLogOut} resizeMode='cover' style={stylesHome.imageIconLogOut} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <>
                        <View style={stylesHome.headerLoggedIn}>
                            <Text style={stylesHome.headerGreeting}>Hola</Text>
                            <Text style={stylesHome.headerText}>¡Que tengas un buen día!</Text>
                        </View>

                        <TouchableOpacity style={stylesHome.touchButtonHeader} onPress={() => navigation.navigate('Login')}>
                            <View style={stylesHome.touchImageButtonHeader}>
                                <Image source={iconLogIn} resizeMode='cover' style={stylesHome.imageIconLogIn} />
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
                            <Image source={booksHistory.bookCover} resizeMode='cover' style={stylesHome.imageBook} />

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