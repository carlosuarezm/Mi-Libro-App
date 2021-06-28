import { getFavCache } from '../persistenciaFavs/db.js'
import React, { useState, useContext, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated
} from 'react-native'

import AppLoading from 'expo-app-loading'
import UserContext from '../context/User/UserContext.js';
import { stylesFavorites } from '../styles/FavoritesStyles.js'
import fetchFont from '../styles/fonts.js'

import iconRating from '../assets/images/star.png'

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.74;
const SPACING = 10;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const UserNotLoggedIn = () => (
    <View style={stylesFavorites.loadingContainer}>
        <Text style={stylesFavorites.paragraph}>¡Para acceder a su Lista de Favoritos debe estar logueado!</Text>
    </View>
);


const Favorites = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [fontLoaded, setFontLoaded] = useState(false)
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const { state } = useContext(UserContext)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const favorites = getFavCache()
            setFavorites([{ id: -1 }, ...favorites, { id: -2 }])
        })
        return unsubscribe;
    }, [navigation, state]);


    if (!state) {
        return <UserNotLoggedIn />;
    }

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFont}
            onError={() => console.log("ERROR en FONT")}
            onFinish={() => {
                setFontLoaded(true)
            }}
        />
    }

    const renderItem = ({ item, index }) => {
        if (!item.bookCover) {
            return <View style={{ width: SPACER_ITEM_SIZE }}/>;
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
                        <Image source={item.bookCover} resizeMode='cover' style={stylesFavorites.imageBookCover} />

                        {/* Book Info */}
                        <View style={stylesFavorites.bookInfoContainer}>
                            <Text style={stylesFavorites.bookName}>{item.bookName}</Text>
                            <Text style={stylesFavorites.authorName}>{item.author}</Text>
                        </View>

                        {item.rating !== 'N/A'
                        ? 
                        <View style={stylesFavorites.containerRating}>
                            <Text>{item.rating}</Text>
                            <Image resizeMode='cover' source={iconRating} style={stylesFavorites.imageRating} />
                        </View>

                        : null
                        }
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }

    return (
        <View style={stylesFavorites.favoritesContainer}>
            {/* Header */}
            <View style={stylesFavorites.favoritesHeaderContainer}>
                <Text style={stylesFavorites.favoritesTextHeader}>Mis Favoritos</Text >
            </View>

            {favorites.length == 2

                ?
                <View style={stylesFavorites.emptyFavoritesContainer}>
                    <Text style={stylesFavorites.textEmptyFavorites}>¡Su lista de Favoritos está vacía!</Text >
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