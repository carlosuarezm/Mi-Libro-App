import React from 'react'
import { useReducer } from 'react'
import BookReducer from './BookReducer.js'
import BookContext from './BookContext.js'
import getBooks from '../../apis/Books.js'
import AsyncStorage from '../../utils/storage'

const historialDeLibros = getBooks();

const BookState = (props) => {
    
    const initialState = {
        booksHistory: {},
        favBooks: []
    }
    
    const [state, dispatch] = useReducer(BookReducer, initialState);

    //-------------------- Historial de Búsquedas --------------------
    const fillBooksHistory = (books) => {
        // if(!books){
        //     books = AsyncStorage.getData('@keyHistorialLibros')
        // }
        dispatch({
            type: 'FILL_BOOKS_HISTORY',
            payload: books
        })
    }

    const setBooksHistory = (book) => {
        dispatch({
            type: 'SET_BOOKS_HISTORY',
            payload: book
        })
    }

    const deleteBookHistory = (book) => {
        dispatch({
            type: 'DELETE_BOOK_HISTORY',
            payload: book
        })
    }

    //----------------------------------------------------------------

    
    const fillFavBooks = (book) => {
        // console.log('Estoy en el metodo fillFavBook de BookState')
        // console.log(book)
        dispatch({
            type: 'FILL_FAV_BOOKS',
            payload: book
        })
    }

    const setFavBooks = (book) => {
        dispatch({
            type: 'SET_FAV_BOOKS',
            payload: book
        })
    }

    const deleteFavBook = (book) => {
        // console.log('Estoy en el metodo fillFavBook de BookState')
        // console.log(book)
        dispatch({
            type: 'DELETE_FAV_BOOK',
            payload: book
        })
    }

    return(
        <BookContext.Provider value={{
            booksHistory: state.booksHistory,
            favBooks: state.favBooks,
            fillBooksHistory,
            setFavBooks,
            setBooksHistory,
            deleteBookHistory,
            fillFavBooks,
            deleteFavBook
        }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookState;









    // const getBooksHistory = () => {
    //     dispatch({
    //         type: 'GET_BOOKS_HISTORY',
    //         payload: state.booksHistory
    //     })
    // }
    