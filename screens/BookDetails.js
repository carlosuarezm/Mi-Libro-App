import React, { useState, useContext } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import iconBack from '../assets/back.png'
import iconLike from '../assets/like3.png'
import AppLoading from 'expo-app-loading'
import BookContext from '../context/Book/BookContext.js'
import UserContext from '../context/User/UserContext.js';
import { addToFavorite, getIsFavorite, removeAFavorite } from '../persistenciaFavs/db.js'
import fetchFont from '../styles/fonts.js'
import { stylesBookDetails } from '../styles/BookDetailsStyles.js'
import { LineDivider } from '../styles/LineDivider'


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
                response ? setIsFavorite(true) : null
            }
        })()
    }, [state, book])


    async function addFavorite() {

        if (state) {
            try {
                await addToFavorite(state, book)
                setIsFavorite(true)
            } catch (error) {
                alert('Error inesperado')
            }
        }
    }

    async function removeFavorite() {
        if (state) {
            try {
                await removeAFavorite(state, book)
                setIsFavorite(false)
            } catch (error) {
                alert('Error inesperado')
            }
        }
    }

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFont}
            onError={() => console.log("ERROR FONT")}
            onFinish={() => {
                setFontLoaded(true)
            }}
        />
    }


    function renderBookInfoSection() {

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={book.bookCover} resizeMode='cover' style={stylesBookDetails.imageBackground} />

                {/* Color Overlay */}
                <View style={stylesBookDetails.colorOverlay} />

                {/* Navigation Header */}
                <View style={stylesBookDetails.containerHeader}>
                    <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => navigation.goBack()}>
                        <Image source={iconBack} resizeMode='contain' style={stylesBookDetails.imageIconBack} />
                    </TouchableOpacity>

                    <View style={stylesBookDetails.containerDetailTitle}>
                        <Text style={state ? stylesBookDetails.textDetailTitle : stylesBookDetails.textDetailTitleNotLoggedIn}>Detalle del Libro</Text>
                    </View>

                    {state
                        ?
                        <TouchableOpacity style={{ marginLeft: 8 }} onPress={isFavorite ? removeFavorite : addFavorite}>
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
                <View style={stylesBookDetails.containerBookCover}>
                    <Image source={book.bookCover} resizeMode='contain' style={stylesBookDetails.bookCoverImage} />
                </View>

                {/* Book Name and Author */}
                <View style={stylesBookDetails.containerBookNameAuthor}>
                    <Text style={stylesBookDetails.bookName}>{book.bookName}</Text>
                    <Text style={stylesBookDetails.bookAuthor}>{book.author}</Text>
                </View>

                {/* Book Info */}
                <View style={stylesBookDetails.containerBookInfo}>
                    {/* Rating */}
                    <View style={stylesBookDetails.itemsBookInfo}>
                        <Text style={stylesBookDetails.textDescriptionItems}>{book.rating}</Text>
                        <Text style={stylesBookDetails.textTitleItems}>Rating</Text>
                    </View>

                    <LineDivider />

                    {/* Pages */}
                    <View style={stylesBookDetails.itemsBookInfo}>
                        <Text style={stylesBookDetails.textDescriptionItems}>{book.pageNo}</Text>
                        <Text style={stylesBookDetails.textTitleItems}>Nro. Paginas</Text>
                    </View>

                    <LineDivider />

                    {/* Published Date */}
                    <View style={stylesBookDetails.itemsBookInfo}>
                        <Text style={stylesBookDetails.textDescriptionItems}>{book.publishedDate}</Text>
                        <Text style={stylesBookDetails.textTitleItems}>Publicacion</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderBookDescription() {

        return (
            <View style={stylesBookDetails.containerDescription}>
                <Text style={stylesBookDetails.textTitleDescription}>Descripcion</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingBottom: 180, marginBottom:10 }}
                >
                    <Text style={stylesBookDetails.textBookDescription} >{book.description}</Text>
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={stylesBookDetails.containerBookDetails}>
            {/* Book Cover Section */}
            <View style={stylesBookDetails.containerBookCoverSection}>
                {renderBookInfoSection()}
            </View>

            {/* Description */}
            <View style={stylesBookDetails.containerDescriptionSection}>
                {renderBookDescription()}
            </View>
        </View>
    )
}

export default BookDetail