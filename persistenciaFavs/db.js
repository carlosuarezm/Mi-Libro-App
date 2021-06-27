import axios from "axios"

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
        alert(error.message)
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