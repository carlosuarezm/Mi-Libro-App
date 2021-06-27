import getBooks from "../apis/Books";
import Firebase from "../database/firebase";

const favorites = [];
const books = getBooks();

// function addToFavorite(idBook){
//     const result = books.find( book => book.id === idBook);

//     if(favorites.length>0){
//         const result2 = favorites.find(favorite => favorite.id === idBook)
//         if(!result2){
//             favorites.push(result)
//         }
//     }else{
//         favorites.push(result)
//     }

//     // if(result){
//     //     favorites.push(result)
//     // }
// }

function addToFavorite(book){

    if(favorites.length>0){
        const favorito = favorites.find(favorite => favorite.id === book.id)
        if(!favorito){
            favorites.push(book)
        }
    }else{
        favorites.push(book)
    }

    // if(result){
    //     favorites.push(result)
    // }
}

function addFavorites(books){
    favorites.splice(0, books)
}


function removeAFavorite(idBook){
    const result = favorites.find( favorite => favorite.id === idBook);

    if(result){
        const index = favorites.indexOf(result)
        favorites.splice(index, 1)
    }
}

async function getFavorites(){
    await Firebase.db.collection('favoritos').onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            const favoriteSave = favorites.find(fav => fav.id === doc.data().book.id)
            favoriteSave ? null : favorites.push(doc.data().book)
            console.log(doc.data().book)
        })
    })

    return favorites
}

function getIsFavorite(idBook){
    let favorite;

    if(favorites.length > 0){
        favorite = favorites.find(book => book.id === idBook)
        console.log('Estoy en DB y el favorito es: ')
        console.log(favorite)
    }

   return favorite
} 

export { addToFavorite, addFavorites, getFavorites, getIsFavorite, removeAFavorite }