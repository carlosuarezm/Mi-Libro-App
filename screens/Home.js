import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image, Dimensions, StatusBar } from 'react-native'
import iconCamera from '../assets/camera.png'
import iconLogOut from '../assets/logout.png'
import iconLogIn from '../assets/login2.png'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import BookContext from '../context/Book/BookContext.js'
import { Constants } from 'expo-camera'

import AsyncStorage from '../utils/storage'

import UserContext from '../context/User/UserContext.js';


const fetchFont = async () => {
    await Font.loadAsync({
        'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf')
    })
}

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;
const SPACING = 10;

const Home = ({ navigation }) => {
    const [books, setBooks] = useState();
    const { booksHistory, setBooksHistory } = useContext(BookContext)
    const { state, setUserAuthenticated } = useContext(UserContext)

    //Boton LOGOUT
    async function logOut() {
        await AsyncStorage.clearData();
        setUserAuthenticated(null)
        navigation.navigate('Login')
    }

    //Fuentes
    const [fontLoaded, setFontLoaded] = useState(false)

    function renderHeader() {
        if (!fontLoaded) {
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }

        return (
            <>
                {/* Saludo */}
                {state && state.payload
                    ?
                    <>
                        <View style={styles.headerLoggedIn}>
                            <Text style={styles.headerGreeting}>Hola</Text>
                            <Text style={styles.headerText}>{state.payload.name}</Text>
                        </View>

                        <TouchableOpacity style={styles.touchButtonHeader} onPress={logOut}>
                            <View style={styles.touchImageButtonHeader}>
                                <Image source={iconLogOut} resizeMode='contain' style={{ width: 20, height: 20 }} />
                            </View>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <View style={styles.headerLoggedIn}>
                            <Text style={styles.headerGreeting}>Hola</Text>
                            <Text style={styles.headerText}>¡Que tengas un buen día!</Text>
                        </View>

                        <TouchableOpacity style={styles.touchButtonHeader} onPress={() => navigation.navigate('Login')}>
                            <View style={styles.touchImageButtonHeader}>
                                <Image source={iconLogIn} resizeMode='contain' style={{ width: 28, height: 28 }} />
                            </View>
                        </TouchableOpacity>
                    </>
                }
            </>
        )
    }

    function renderMyBookSection() {

        if (!fontLoaded) {
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }

        return (
            <>
                {/* Header */}
                <View style={styles.headerBookSection}>
                    <Text style={styles.textHeaderBookSection}>Mi última busqueda</Text>
                </View>

                {/* Books */}
                {booksHistory === null || booksHistory.id === undefined

                    ?
                    <View style={styles.booksContainer}>
                        <Text style={styles.textBooks}>
                            No tiene búsquedas recientes.
                        </Text>
                        <Text style={styles.textBooks}>
                            ¡Realice una búsqueda!
                        </Text>
                    </View>

                    :
                    <View style={styles.bookContainer}>
                        <TouchableOpacity
                            style={styles.touchBook}
                            onPress={() => navigation.navigate("BookDetails", {
                                book: booksHistory
                            })}
                        >
                            {/* Book Cover */}
                            <Image source={booksHistory.bookCover} resizeMode='contain' style={styles.imageBook} />

                            {/* Book Info */}
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.textBookInfo}>{booksHistory.author}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
    }

    function renderCameraSection() {
        if (!fontLoaded) {
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }

        return (
            <>
                {/* Camera */}
                <TouchableOpacity style={styles.touchCamera} onPress={() => navigation.navigate("Camera")}>
                    <View style={styles.cameraContainer}>
                        <View style={styles.imageCameraContainer}>
                            <Image source={iconCamera} resizeMode='contain' style={styles.imageCamera} />
                        </View>

                        <Text style={styles.textCamera}>Buscar</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26', marginTop: StatusBar.currentHeight }}>
            {/* Header Section */}
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 24, alignItems: 'center' }}>
                {renderHeader()}
            </View>
            {/* Books Section */}
            <View style={{ flex: 3 }}>
                {renderMyBookSection()}
            </View>
            {/* Camera Section */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {renderCameraSection()}
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    touchCamera: {
        backgroundColor: '#F96D41',
        height: 50,
        paddingLeft: 3,
        paddingRight: 12,
        borderRadius: 20,
        width: 150
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageCameraContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    textCamera: {
        marginLeft: 8,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 22
    },
    headerBookSection: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeaderBookSection: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        lineHeight: 21,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    booksContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    textBooks: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 22,
        color: '#64676D',
        textAlign: 'center'
    },
    bookContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchBook: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBook: {
        width: 180,
        height: 230,
        borderRadius: 3
    },
    bookInfoContainer: {
        marginTop: 12,
        flexDirection: 'row',
        width: 180,
        height: 25,
        justifyContent: 'center'
    },
    textBookInfo: {
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        width: 180,
        height: 200,
        color: '#FFFFFF'
    },
    headerGreeting: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Thin',
        fontSize: 16,
        lineHeight: 22
    },
    headerText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        lineHeight: 30
    },
    headerLoggedIn: {
        flex: 1,
        marginTop: 50
    },
    touchButtonHeader: {
        backgroundColor: '#364156',
        height: 40,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 20,
        marginTop: 50
    },
    touchImageButtonHeader: {
        flex: 1,
        flexDirection: 'row',
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    imageCamera: {
        width: 20,
        height: 20
    }
})