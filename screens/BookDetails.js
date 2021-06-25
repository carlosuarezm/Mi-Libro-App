import React, { useState, useContext } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native'
import iconBack from '../assets/back.png'
import iconLike from '../assets/like3.png'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import BookContext from '../context/Book/BookContext.js'
import UserContext from '../context/User/UserContext.js';
import { addToFavorite, getFavorites, getIsFavorite, removeAFavorite } from '../pruebaFavoritos/db'

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

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View style={{ flex: 1, borderLeftColor: '#EFEFF0', borderLeftWidth: 1 }}></View>
        </View>
    )
}


const BookDetail = ({ route, navigation }) => {
    const [fontLoaded, setFontLoaded] = useState(false)
    const [isFavorite, setIsFavorite] = React.useState(false)
    const [book, setBook] = React.useState(null)

    const { favBooks, fillFavBooks, deleteFavBook } = useContext(BookContext)
    const { state } = useContext(UserContext)

    React.useEffect(() => {
        let { book } = route.params
        setBook(book)
    }, [])

    React.useEffect(() => {
        (() => {
            if (state && book) {
                const response = getIsFavorite(book.id)
                response ? setIsFavorite(true) : console.log('no era favorito')
            } else {
                console.log('Effect. No se pudo analizar si era o no favorito')
            }
        })()
    }, [state, book])


    function addFavorite() {
        if (!state) {
            console.log('no estas registrado')
        } else {
            addToFavorite(book)
            setIsFavorite(true)
            // fillFavBooks(book)
            console.log('El libro ha sido añadido a Favoritos')
        }
    }

    function removeFavorite() {
        if (!state) {
            console.log('no estas registrado')
        } else {
            removeAFavorite(book.id)
            setIsFavorite(false)
            // deleteFavBook(book)
            console.log('El libro ha sido eliminado de Favoritos')
        }
    }


    function renderBookInfoSection() {
        //Para el manejo de Fuentes
        if (!fontLoaded) {
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={book.bookCover}
                    resizeMode='cover'
                    style={styles.imageBackground}
                />

                {/* Color Overlay */}
                <View
                    style={styles.colorOverlay}
                >
                </View>

                {/* Navigation Header */}
                <View style={styles.containerHeader}>
                    <TouchableOpacity
                        style={{ marginLeft: 8 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={iconBack}
                            resizeMode='contain'
                            style={styles.imageIconBack}
                        />
                    </TouchableOpacity>

                    <View style={styles.containerDetailTitle}>
                        <Text style={state ? styles.textDetailTitle : styles.textDetailTitleNotLoggedIn}>Detalle del Libro</Text>
                    </View>

                    {state
                        ?
                        <TouchableOpacity
                            style={{ marginLeft: 8 }}
                            onPress={isFavorite ? removeFavorite : addFavorite}
                        >
                            <Image
                                source={iconLike}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: isFavorite ? 'red' : 'grey' }}
                            />
                        </TouchableOpacity>

                        : <></>
                    }
                </View>

                {/* Book Cover */}
                <View style={styles.containerBookCover}>
                    <Image
                        source={book.bookCover}
                        resizeMode='contain'
                        style={styles.bookCoverImage}
                    />
                </View>

                {/* Book Name and Author */}
                <View style={styles.containerBookNameAuthor}>
                    <Text style={styles.bookName}>{book.bookName}</Text>
                    <Text style={styles.bookAuthor}>{book.author}</Text>
                </View>

                {/* Book Info */}
                <View style={styles.containerBookInfo}>
                    {/* Rating */}
                    <View style={styles.itemsBookInfo}>
                        <Text style={styles.textDescriptionItems}>{book.rating}</Text>
                        <Text style={styles.textTitleItems}>Rating</Text>
                    </View>

                    <LineDivider />

                    {/* Pages */}
                    <View style={styles.itemsBookInfo}>
                        <Text style={styles.textDescriptionItems}>{book.pageNo}</Text>
                        <Text style={styles.textTitleItems}>Nro. Paginas</Text>
                    </View>

                    <LineDivider />

                    {/* Published Date */}
                    <View style={styles.itemsBookInfo}>
                        <Text style={styles.textDescriptionItems}>{book.publishedDate}</Text>
                        <Text style={styles.textTitleItems}>Publicacion</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderBookDescription() {
        //Para las Fuentes
        if (!fontLoaded) {
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }

        return (
            <View style={styles.containerDescription}>
                <Text style={styles.textTitleDescription}>Descripcion</Text>
                <ScrollView
                    contentContainerStyle={{ paddingLeft: 8 }}
                    showsVerticalScrollIndicator={false}
                    style={{ paddingBottom: 180 }}
                >
                    <Text style={styles.textBookDescription} >{book.description}</Text>
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#1E1B26', marginTop: StatusBar.currentHeight  }}>
            {/* Book Cover Section */}
            <View style={{ flex: 4 }}>
                {renderBookInfoSection()}
            </View>

            {/* Description */}
            <View style={{ flex: 3 }}>
                {renderBookDescription()}
            </View>
        </View>
    )
}

export default BookDetail


const styles = StyleSheet.create({
    containerDescription: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 30,
        paddingRight: 24,
        paddingLeft: 24,
        paddingBottom: 0
    },
    textTitleDescription: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        lineHeight: 30,
        color: '#FFFFFF',
        marginBottom: 24
    },
    textBookDescription: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        lineHeight: 30,
        color: '#64676D',
        textAlign: 'justify'
    },
    containerBookInfo: {
        flexDirection: 'row',
        paddingVertical: 20,
        margin: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    itemsBookInfo: {
        flex: 1,
        alignItems: 'center'
    },
    textTitleItems: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    textDescriptionItems: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    containerBookNameAuthor: {
        flex: 1.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bookName: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 30,
        color: '#000000',
        textAlign: 'center'
    },
    bookAuthor: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 22,
        color: '#000000',
        textAlign: 'center'
    },
    containerBookCover: {
        flex: 5,
        paddingTop: 36,
        alignItems: 'center'
    },
    bookCoverImage: {
        flex: 1,
        width: 150,
        height: 'auto'
    },
    textDetailTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 22,
        color: '#000000'
    },
    textDetailTitleNotLoggedIn: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 22,
        color: '#000000',
        paddingRight: 25
    },
    containerDetailTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerHeader: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        height: 80,
        alignItems: 'flex-end'
    },
    imageIconBack: {
        width: 25,
        height: 25,
        tintColor: '#000000'
    },
    colorOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(240, 240, 232, 0.9)'
    },
    imageBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
});