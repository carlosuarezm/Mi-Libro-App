import React from 'react'
import { useReducer } from 'react'
import BookReducer from './BookReducer.js'
import BookContext from './BookContext.js'

const BookState = (props) => {

    const initialState = {
        booksHistory: {}
    }

    const [state, dispatch] = useReducer(BookReducer, initialState);

    const fillBooksHistory = (books) => {
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

    return (
        <BookContext.Provider value={{
            booksHistory: state.booksHistory,
            fillBooksHistory,
            setBooksHistory,
            deleteBookHistory
        }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookState;