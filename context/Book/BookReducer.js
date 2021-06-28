import { SET_BOOKS_HISTORY, FILL_BOOKS_HISTORY, DELETE_BOOK_HISTORY } from "../types";

export default (state, action) => {
    const { payload, type } = action

    switch (type) {
        case FILL_BOOKS_HISTORY:
            return {
                booksHistory: [...state.booksHistory, payload]
            }
        case SET_BOOKS_HISTORY:
            return {
                booksHistory: payload
            }
        case DELETE_BOOK_HISTORY:
            const indexBH = state.booksHistory.indexOf(payload)
            state.booksHistory.splice(indexBH, 1)
            return {
                booksHistory: [...state.booksHistory]
            }
        default:
            return state;
    }
}