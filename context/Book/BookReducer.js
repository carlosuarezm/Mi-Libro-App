import { SET_BOOKS_HISTORY, GET_BOOKS_HISTORY, FILL_BOOKS_HISTORY, DELETE_BOOK_HISTORY, FILL_FAV_BOOKS, SET_FAV_BOOKS, DELETE_FAV_BOOK } from "../types";

export default (state, action) => {
    const {payload, type} = action

    switch(type){
        
        case FILL_BOOKS_HISTORY:
            return{
                booksHistory: [...state.booksHistory, payload]
            }
        case SET_BOOKS_HISTORY:
            return{
                booksHistory: payload
            }    

        case DELETE_BOOK_HISTORY:
            const indexBH = state.booksHistory.indexOf(payload)
            state.booksHistory.splice(indexBH, 1)
            return{
                booksHistory: [...state.booksHistory]
            } 

        case FILL_FAV_BOOKS:
            return{
                favBooks: [...state.favBooks, payload]
            }

        case SET_FAV_BOOKS:
            return{
                booksHistory: payload
            }       

        case DELETE_FAV_BOOK:
            const indexFB = state.favBooks.indexOf(payload)
            state.favBooks.splice(indexFB, 1)
            return{
                favBooks: [...state.favBooks]
            }
    }
}