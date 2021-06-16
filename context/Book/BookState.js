import React from 'react'
import { useReducer } from 'react'
import BookReducer from './BookReducer.js'
import BookContext from './BookContext.js'
import getBooks from '../../apis/Books.js'

const historialDeLibros = getBooks();

const BookState = (props) => {
    
    const initialState = {
        booksHistory:historialDeLibros,
        favBooks:[]
    }
    
    const [state, dispatch] = useReducer(BookReducer, initialState);

    // const getBooksHistory = () => {
    //     dispatch({
    //         type: 'GET_BOOKS_HISTORY',
    //         payload: state.booksHistory
    //     })
    // }

    const fillBooksHistory = (book) => {
        dispatch({
            type: 'FILL_BOOKS_HISTORY',
            payload: book
        })
    }

    const deleteBookHistory = (book) => {
        dispatch({
            type: 'DELETE_BOOK_HISTORY',
            payload: book
        })
    }
    
    const fillFavBooks = (book) => {
        // console.log('Estoy en el metodo fillFavBook de BookState')
        // console.log(book)
        dispatch({
            type: 'FILL_FAV_BOOKS',
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
            deleteBookHistory,
            fillFavBooks,
            deleteFavBook
        }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookState;