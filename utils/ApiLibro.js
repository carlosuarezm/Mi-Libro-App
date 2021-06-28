import axios from 'axios'
import { API_VISION_KEY } from '@env';

const urlAPI = "https://www.googleapis.com/books/v1/volumes"

const buscador = {
    libroPorReconocimiento: async (query) => {
        const { data: libro } = await axios.get(urlAPI + `?q=${query}&maxResults=1&key=${API_VISION_KEY}`)

        return formatear(libro)
    },
}

function formatear(librosAPI) {
    if (!librosAPI || librosAPI.hasOwnProperty('error') || librosAPI.totalItems === 0) {
        throw new Error('Libro no reconocido. Intente nuevamente')
    }

    let book
    if (librosAPI.hasOwnProperty('items')) {
        book = librosAPI.items[0].volumeInfo
        book.id = librosAPI.items[0].id
    } else {
        book = librosAPI.volumeInfo
        book.id = librosAPI.id
    }

    const bookFormateado = formatoBook(book)
    return bookFormateado
}

function formatoBook(book) {
    const losAtributosDelBook = {
        id: book.id,
        title: book.title,
        authors: book.authors,
        publishedDate: book.publishedDate,
        averageRating: book.averageRating,
        description: book.description,
        pageCount: book.pageCount,
        imageLinks: book.imageLinks,
        infoLink: book.infoLink
    }
    return losAtributosDelBook
}


export { buscador }