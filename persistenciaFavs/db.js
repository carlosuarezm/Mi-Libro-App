import axios from "axios"
import {Alert} from 'react-native'

let favorites = [];

async function addToFavorite(state, book) {

    try {
        const req = {
            id_user: state.id,
            libro: book
        }
        const { data } = await axios.post('https://mi-libro-app.herokuapp.com/api/favoritos/agregar', req)
        favorites = data
    } catch (error) {
        Alert.alert('¡Lo sentimos!', error.message, [{text: 'ok'}])
    }

}

function getFavCache() {
    return favorites
}


async function removeAFavorite(state, book) {
    // const result = favorites.find( favorite => favorite.id === idBook);
    const req = {
        id_user: state.id,
        libro: book
    }
    const { data } = await axios.post('https://mi-libro-app.herokuapp.com/api/favoritos/eliminar', req)
    favorites = data
    console.log('Estoy viendo los Favoritos luego de borrar')
    console.log(favorites)
}

async function getFavorites(idUser) {
    const { data } = await axios.get('https://mi-libro-app.herokuapp.com/api/favoritos', { params: { id_user: idUser } })
    favorites = data

    // return favorites
}

function getIsFavorite(idBook) {
    let favorite;

    if (favorites.length > 0) {
        favorite = favorites.find(book => book.id === idBook)

    }

    return favorite
}

function logOutFavorites() {
    favorites = []
}

export { addToFavorite, getFavCache, getFavorites, getIsFavorite, removeAFavorite, logOutFavorites }