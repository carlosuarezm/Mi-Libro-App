// import iconMore from '../assets/more.png'
// import getBooks from '../apis/Books.js'
// import { useFocusEffect } from '@react-navigation/native';
// import Favorites from './Favorites'
//Saque el useContext importado por separado.
import React, {useState, useContext} from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, Icon} from 'react-native'

import { Image } from 'react-native'
import iconBack from '../assets/back.png'
import iconLike from '../assets/like3.png'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import BookContext from '../context/Book/BookContext.js'
import { addToFavorite, getFavorites, getIsFavorite, removeAFavorite } from '../prueba/db'

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


const LineDivider = () => {
    return(
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View style={{ flex: 1, borderLeftColor: '#EFEFF0', borderLeftWidth: 1 }}></View>
        </View> 
    )
}

const BookDetail = ({route, navigation}) => {

    // const [booksFavorites, setBooksFavorites] = React.useState([])
    // const [loading, setLoading] = React.useState(false)
    // const [reloadData, setReloadData] = React.useState(false)
    
    const [fontLoaded, setFontLoaded] = useState(false)
    const [userLogged, setUserLogged] = useState(true)
    const [isFavorite, setIsFavorite] = React.useState(false)
    const [book, setBook] = React.useState(null)

    const { favBooks, fillFavBooks, deleteFavBook } = useContext(BookContext)
    const { state } = useContext(UserContext)

    React.useEffect(() => {
        let {book} = route.params
        setBook(book)
    }, [])

    // console.log(state)
    // console.log('Los favoritos: ')
    // console.log(favBooks)


    React.useEffect(() => {
        (() => {
            if(state && book){
                //favBooks es undefined
                console.log(book)
                const response = getIsFavorite(book.id)
                response ? setIsFavorite(true) : console.log('no era favorito')
            }else{
                console.log('Effect. No se pudo analizar si era o no favorito')
            }
        })()
    }, [state, book])



    function addFavorite(){
        if(!state){
            console.log('no estas registrado')
        }else{
            addToFavorite(book)
            setIsFavorite(true)
            // fillFavBooks(book)
            console.log('El libro ha sido añadido a Favoritos')
        }
    }

    function removeFavorite(){
        if(!state){
            console.log('no estas registrado')
        }else{
            removeAFavorite(book.id)
            setIsFavorite(false)
            // deleteFavBook(book)
            console.log('El libro ha sido eliminado de Favoritos')
        }
    }


    function renderBookInfoSection(){

        //Para el manejo de Fuentes
        if(!fontLoaded){
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }


        return (
            <View style={{ flex: 1}}>
                <ImageBackground
                    source={book.bookCover}
                    resizeMode='cover'
                    style={{
                        position:'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }}
                />

                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: book.backgroundColor
                    }}
                >
                </View>

                {/* Navigation Header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: 12, height: 80, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ marginLeft: 8}}
                        onPress={() => navigation.goBack()}
                    >
                        <Image 
                            source={iconBack}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: book.navTintColor
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily:'Roboto-Bold', fontSize: 16, lineHeight: 22, color: book.navTintColor }}>Detalle del Libro</Text>
                    </View>

                    {state 
                    
                    ?
                    <TouchableOpacity
                        style={{ marginLeft: 8}}
                        onPress = {isFavorite ? removeFavorite : addFavorite}
                    >
                        <Image 
                            source={iconLike}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: isFavorite ? 'red' : 'grey' 
                            }}
                        />
                    </TouchableOpacity>
                    
                    : <></>
                    }
                    

                </View>


                {/* Book Cover */}
                <View style={{ flex: 5, paddingTop: 36, alignItems: 'center' }}>
                    <Image
                        source={book.bookCover}
                        resizeMode='contain'
                        style={{
                            flex: 1,
                            width: 150,
                            height: 'auto'
                        }}
                    />
                </View>

                {/* Book Name and Author */}
                <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily:'Roboto-Bold', fontSize: 16, lineHeight: 30, color: book.navTintColor, textAlign:'center' }}>{book.bookName}
                        </Text>
                        <Text style={{ fontFamily:'Roboto-Regular', fontSize: 16, lineHeight: 22, color: book.navTintColor, textAlign:'center' }}>{book.author}</Text>
                </View>

                {/* Book Info */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 20,
                        margin: 24,
                        borderRadius: 12,
                        backgroundColor: 'rgba(0,0,0,0.3)'
                    }}
                >
                    {/* Rating */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize: 16, lineHeight: 22, color: '#FFFFFF'}}>{book.rating}
                        </Text>
                        <Text style={{fontFamily:'Roboto-Regular', fontSize: 14, lineHeight: 22, color: '#FFFFFF'}}>Rating
                        </Text>
                    </View>

                    <LineDivider/>

                    {/* Pages */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize: 16, lineHeight: 22, color: '#FFFFFF'}}>{book.pageNo}
                        </Text>
                        <Text style={{fontFamily:'Roboto-Regular', fontSize: 14, lineHeight: 22, color: '#FFFFFF'}}>Nro. Paginas
                        </Text>
                    </View>

                    <LineDivider/>

                    {/* Published Date */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{fontFamily:'Roboto-Bold', fontSize: 16, lineHeight: 22, color: '#FFFFFF'}}>{book.publishedDate}
                        </Text>
                        <Text style={{fontFamily:'Roboto-Regular', fontSize: 14, lineHeight: 22, color: '#FFFFFF'}}>Publicacion
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderBookDescription(){

        if(!fontLoaded){
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }

        return(
            <View style={{ flex: 1, flexDirection: 'column', paddingTop: 50, paddingRight: 24, paddingLeft: 24, paddingBottom: 0}}>
                <Text style={{ fontFamily:'Roboto-Bold', fontSize: 22, lineHeight: 30, color: '#FFFFFF', marginBottom: 24 }}>Descripcion
                </Text>
                <ScrollView
                    contentContainerStyle={{paddingLeft: 8}}
                    showsVerticalScrollIndicator={false}
                    style={{paddingBottom:180}}
                >
                    <Text style={{ fontFamily:'Roboto-Regular', fontSize: 18, lineHeight: 30, color: '#64676D', textAlign: 'justify'}} >{book.description}</Text>
                </ScrollView>
            </View>
        )
    }




    if(book){
        return(
            <View style={{ flex: 1, backgroundColor: '#1E1B26'}}>
                {/* Book Cover Section */}
                <View style={{ flex: 4 }}>
                    {renderBookInfoSection()}
                </View>

                {/* Description */}
                <View style={{ flex: 2 }}>
                    {renderBookDescription()}
                </View>

                {/* Buttons */}
                <View style={{ height: 70 }}></View>

            </View>
    
        )
    }else{
        return (
        <>
            <View>
                <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
            </View>
        
        </>)
    }

}

export default BookDetail