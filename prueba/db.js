import getBooks from "../apis/Books";

const favorites = [];
const books = getBooks();

function addToFavorite(idBook){
    const result = books.find( book => book.id === idBook);

    if(favorites.length>0){
        const result2 = favorites.find(favorite => favorite.id === idBook)
        if(!result2){
            favorites.push(result)
        }
    }else{
        favorites.push(result)
    }

    // if(result){
    //     favorites.push(result)
    // }
}

function removeAFavorite(idBook){
    const result = favorites.find( favorite => favorite.id === idBook);

    if(result){
        const index = favorites.indexOf(result)
        favorites.splice(index, 1)
    }
}

function getFavorites(){
    return favorites
}

function getIsFavorite(idBook){
   return favorites.find(book => book.id === idBook)
}

export { addToFavorite, getFavorites, getIsFavorite, removeAFavorite }