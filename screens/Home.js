import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image, Dimensions, StatusBar } from 'react-native'
import iconCamera from '../assets/camera.png'
import iconLogOut from '../assets/logout.png'
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
    function logOut() {
        AsyncStorage.clearData();
        setUserAuthenticated(null)
        navigation.goBack()
    }

    //Fuentes
    const [fontLoaded, setFontLoaded] = useState(false)


    //Función que Renderiza el Header
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

                {state
                    ? <>
                        <View style={{ flex: 1, marginTop:50 }}>
                            <View style={{ marginRight: 24 }}>
                                <Text style={{ color: '#FFFFFF', fontFamily: 'Roboto-Thin', fontSize: 16, lineHeight: 22 }}>Hola</Text>
                                <Text style={{ color: '#FFFFFF', fontFamily: 'Roboto-Medium', fontSize: 18, lineHeight: 30 }}>{state.payload.name}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#364156',
                                height: 40,
                                paddingLeft: 12,
                                paddingRight: 12,
                                borderRadius: 20,
                                marginTop:50
                            }}
                            onPress={logOut}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
                                    borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)'
                                }}>
                                    <Image
                                        source={iconLogOut}
                                        resizeMode='contain'
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                </View>
                            </View>

                        </TouchableOpacity>
                    </>


                    : <View style={{ flex: 1, marginTop:50 }}>
                        <View style={{ marginRight: 24 }}>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Roboto-Thin', fontSize: 16, lineHeight: 22 }}>Hola</Text>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Roboto-Medium', fontSize: 18, lineHeight: 30 }}>¡Que tengas un buen día!</Text>
                        </View>
                    </View>
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

        const renderItem = () => {

            return (
                <TouchableOpacity
                    style={{
                        margin:0,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    onPress={ () => navigation.navigate("BookDetails", {
                        book: booksHistory
                    })}
                >

                    {/* Book Cover */}
                    <Image
                        source={booksHistory.bookCover}
                        resizeMode='contain'
                        style={{
                            width: 180,
                            height: 230,
                            borderRadius: 3
                        }}
                    />

                    {/* Book Info */}
                    <View style={{ marginTop: 12, flexDirection: 'row', width: 180, height: 25, justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Roboto-Regular', textAlign: 'center', width: 180, height: 200, color: '#FFFFFF' }}>{booksHistory.author}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <>
                {/* Header */}
                <View style={{ flex: 1, paddingHorizontal: 24, marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
                    <Text style={{ fontFamily: 'Roboto-Light', fontSize: 18, lineHeight: 21, color: '#FFFFFF', textAlign:'center' }}>Mi última busqueda</Text>
                </View>

                {/* Books */}

                {booksHistory === null || booksHistory.id === undefined

                    ? <View style={{ flex: 1, flexDirection: 'column', alignItems:'center' }}>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, lineHeight: 22, color: '#64676D', textAlign: 'center' }}>
                            No tiene búsquedas recientes.
                        </Text>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, lineHeight: 22, color: '#64676D', textAlign: 'center' }}>
                            ¡Realice una búsqueda!
                        </Text>
                    </View>

                    : <View style={{ flex: 4, alignItems:'center', justifyContent:'center' }}>
                        {renderItem()}
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
                <View style={{ width: 150 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#F96D41',
                            height: 50,
                            paddingLeft: 3,
                            paddingRight: 12,
                            borderRadius: 20
                        }}
                        onPress={() => navigation.navigate("Camera")}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                width: 30, height: 30, alignItems: 'center', justifyContent: 'center',
                                borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)'
                            }}>
                                <Image
                                    source={iconCamera}
                                    resizeMode='contain'
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                />
                            </View>

                            <Text style={{ marginLeft: 8, color: '#FFFFFF', fontFamily: 'Roboto-Regular', fontSize: 16, lineHeight: 22 }}>Buscar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26', marginTop: StatusBar.currentHeight }}>
            {/* Body Section */}
            {/* <ScrollView style={{ flex: 2, backgroundColor: 'red' }}> */}
                {/* Header Section */}
                <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 24, alignItems: 'center' }}>
                    {renderHeader()}
                </View>
                {/* Books Section */}
                <View style={{ flex: 3 }}>
                    {renderMyBookSection()}
                </View>
                <View style={{ flex: 1, justifyContent:'center', alignItems: 'center' }}>
                    {renderCameraSection()}
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>

    )
}


export default Home