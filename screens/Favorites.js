import { getFavorites, addToFavorite, addFavorites } from '../pruebaFavoritos/db'
import getBooks from '../apis/Books'

import React, { useState, useContext, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    StatusBar
} from 'react-native'

import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import BookContext from '../context/Book/BookContext'

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

const { height, width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.74;
const SPACING = 10;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const UserNotLoggedIn = () => (
    <View style={styles.loadingContainer}>
        <Text style={styles.paragraph}>¡Para acceder a su Lista de Favoritos debe estar logueado!</Text>
    </View>
);


const Favorites = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [fontLoaded, setFontLoaded] = useState(false)
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const { favBooks, fillFavBooks, setFavBooks } = useContext(BookContext)
    const { state } = useContext(UserContext)

    // useEffect(() => {
    //     const favorites = getFavorites()
    //     console.log(favorites)
    //     setFavorites([{ id: -1 }, ...favorites, { id: -2 }])
    // }, [favorites])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const favorites = getFavorites()
            console.log(favorites)
            setFavorites([{ id: -1 }, ...favorites, { id: -2 }])
        });

        return unsubscribe;
    }, [navigation]);


    if (!state) {
        return <UserNotLoggedIn />;
    }

    // **** Para las Fuentes **** //
    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFont}
            onError={() => console.log("ERROR")}
            onFinish={() => {
                setFontLoaded(true)
            }}
        />
    }

    const renderItem = ({ item, index }) => {
        if (!item.bookCover) {
            console.log(11)
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
        }
        const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
        ];

        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0]
        });

        return (
            <View style={{ width: ITEM_SIZE }}>
                <Animated.View style={{
                    marginHorizontal: SPACING * 3,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    transform: [{ translateY }],
                    backgroundColor: '#FFFFFF',
                    borderRadius: 34,
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate("BookDetails", { book: item })}>
                        {/* Book Cover */}
                        <Image source={item.bookCover} resizeMode='cover' style={styles.imageBookCover}/>

                        {/* Book Info */}
                        <View style={styles.bookInfoContainer}>
                            <Text style={styles.bookName}>{item.bookName}</Text>
                            <Text style={styles.authorName}>{item.author}</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }

    return (
        <View style={styles.favoritesContainer}>
            {/* Header */}
            <View style={styles.favoritesHeaderContainer}>
                <Text style={styles.favoritesTextHeader}>Mis Favoritos</Text >
            </View>

            {favorites.length === 2

                ?
                <View style={styles.emptyFavoritesContainer}>
                    <Text style={styles.textEmptyFavorites}>¡Su lista de Favoritos está vacía!</Text >
                </View>

                : 
                <Animated.FlatList
                    showsHorizontalScrollIndicator={false}
                    data={favorites}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    contentContainerStyle={{ alignItems: 'center' }}
                    snapToInterval={ITEM_SIZE}
                    decelerationRate={0}
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    renderItem={renderItem}
                />
            }
        </View>

    )
}

export default Favorites



const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E1B26'
    },
    container: {
        flex: 1,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        color: '#FFFFFF'
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
    favoritesContainer: {
        flex: 1,
        backgroundColor: '#1E1B26',
        marginTop: StatusBar.currentHeight
    },
    favoritesHeaderContainer: {
        flex: 0.5,
        paddingHorizontal: 24,
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    favoritesTextHeader: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    emptyFavoritesContainer: {
        flex: 3,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textEmptyFavorites: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        lineHeight: 22,
        color: '#64676D',
        textAlign: 'center'
    },
    imageBookCover: {
        width: 180,
        height: 250,
        borderRadius: 20
    },
    bookInfoContainer: {
        marginTop: 12,
        flexDirection: 'column',
        width: 180,
        height: 100,
        justifyContent: 'flex-start'
    },
    bookName: {
        fontFamily: 'Roboto-Medium',
        marginLeft: 5,
        textAlign: 'center',
        width: 180,
        color: '#000000'
    },
    authorName: {
        fontFamily: 'Roboto-Light',
        marginLeft: 5,
        marginTop: 10,
        textAlign: 'center',
        width: 180,
        color: '#000000'
    }
});