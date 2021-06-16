import getBooks from "../apis/Books";
import firebase from '../firebase/fire.js'
import React, { useEffect } from 'react'

const favorites = [];
const books = getBooks();
const db = firebase.firestore();

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
    //****Prueba Persistencia de datos con Async y Await*/
    //**Usar Async y await */
    //**ALTA */
    db.collection('favoritos').add({
        idUsuario: 'id2',
        nombre: 'Carlitos',
        favoritos: ["TengoCalle4","TengoCalle5","TengoCalle6"]
    })

    //*Devuelte los docs uno por uno********* */
    db.collection('favoritos').onSnapshot(querySnapshot =>{
        querySnapshot.docs.forEach(doc => {
            console.log("SNAP:",doc.data())
            console.log("SNAP-id:",doc.id)
        })
    })

    //***DELETE x ID del documento usar Alert */
    // const favoritoAborrar = db.collection('favoritos').doc('nzrKJTLffQI7cTuLcIoC')
    // favoritoAborrar.delete()
   
   
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