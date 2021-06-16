import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image, Dimensions } from 'react-native'
import iconCamera from '../assets/camera.png'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import BookContext from '../context/Book/BookContext.js'

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

    const [books, setBooks] = useState([]);
    const [userLogged, setUserLogged] = useState(true)

    const { booksHistory } = useContext(BookContext)

    useEffect(() => {
        setBooks(booksHistory)
    }, [])

    const [fontLoaded, setFontLoaded] = useState(false)

    const profileData = {
        name: 'Lee Wei Chun'
    }

    const [profile, setProfile] = React.useState(profileData)

    function renderHeader(profile) {

        if (!fontLoaded) {
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }

        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 24, alignItems: 'center' }}>
                {/* Saludo */}

                {userLogged
                    ? <View style={{ flex: 1 }}>
                        <View style={{ marginRight: 24 }}>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Roboto-Thin', fontSize: 16, lineHeight: 22 }}>Hola</Text>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Roboto-Medium', fontSize: 18, lineHeight: 30 }}>{profile.name}</Text>
                        </View>
                      </View>


                    : <View style={{ flex: 1 }}>
                        <View style={{ marginRight: 24 }}>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Roboto-Thin', fontSize: 16, lineHeight: 22 }}>Hola</Text>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Roboto-Medium', fontSize: 18, lineHeight: 30 }}>¡Que tengas un buen día!</Text>
                        </View>
                      </View>
                }

                {/* Camera */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#F96D41',
                        height: 40,
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

        const renderItem = ({ item, index }) => {

            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? 24 : 0,
                        marginRight: 12,
                    }}
                    onPress={() => navigation.navigate("BookDetails", {
                        book: item
                    })}
                >

                    {/* Book Cover */}
                    <Image
                        source={item.bookCover}
                        resizeMode='cover'
                        style={{
                            width: 180,
                            height: 250,
                            borderRadius: 20
                        }}
                    />

                    {/* Book Info */}
                    <View style={{ marginTop: 12, flexDirection: 'row', width: 180, height: 200, justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Roboto-Regular', marginLeft: 5, textAlign: 'center', width: 180, height: 200, color: '#FFFFFF' }}>{item.author}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, lineHeight: 22, color: '#FFFFFF' }}>Mis Busquedas Recientes</Text>
                </View>

                {/* Books */}

                {books.length === 0 || books === undefined

                    ? <View style={{ paddingHorizontal: 24, marginTop: 50, flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, lineHeight: 22, color: '#64676D', textAlign: 'center' }}>
                            No tiene búsquedas recientes.
                        </Text>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, lineHeight: 22, color: '#64676D', textAlign: 'center' }}>
                            ¡Realice una búsqueda!
                        </Text>
                    </View>

                    : <View style={{ flex: 1, marginTop: 24 }}>
                        <FlatList
                            data={books}
                            renderItem={renderItem}
                            keyExtractor={item => `${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={ITEM_SIZE}
                            decelerationRate={0}
                            bounces={false}
                        />
                    </View>
                }
            </View>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
            {/* Header Section */}
            <View style={{ height: 200 }}>
                {renderHeader(profile)}
            </View>

            {/* Body Section */}
            <ScrollView style={{ marginTop: 12 }}>
                {/* Books Section */}
                <View>
                    {renderMyBookSection()}
                </View>

                {/* Categories Section */}

            </ScrollView>
        </SafeAreaView>

    )
}


export default Home