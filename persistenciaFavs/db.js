import axios from "axios"
import { Alert } from 'react-native'

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
        Alert.alert('¡Lo sentimos!', error.message, [{ text: 'ok' }])
    }
}

function getFavCache() {
    return favorites
}

async function removeAFavorite(state, book) {
    const req = {
        id_user: state.id,
        libro: book
    }
    const { data } = await axios.post('https://mi-libro-app.herokuapp.com/api/favoritos/eliminar', req)
    favorites = data
}

async function loadFavorites(idUser) {
    const { data } = await axios.get('https://mi-libro-app.herokuapp.com/api/favoritos', { params: { id_user: idUser } })
    favorites = data
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

export { addToFavorite, getFavCache, loadFavorites, getIsFavorite, removeAFavorite, logOutFavorites }