import axios from 'axios' 
// import { API_VISION_KEY } from '@env';
const API_VISION_KEY ='AIzaSyDJa3VCojDukuMXi86rKk4RhoOv4wDoc8Q'
const urlAPI = "https://www.googleapis.com/books/v1/volumes"


    
    const buscador = {

        libroPorReconocimiento : async (query) => {
            const {data: libro} = await axios.get(urlAPI + `?q=${query}&maxResults=1&key=${API_VISION_KEY}`)
            
            return formatear(libro)
        },

        libroPorAutor :  async (autor) => {
            return new Promise((resolve, reject) =>{
                fetch(urlAPI + `?q=inauthor:${autor}`)
                .then(librosAPI => librosAPI.json())
                .then(librosAPI => resolve(formatearLista(librosAPI)))
                .catch(error => reject(error))
            })
        },

        libroPorId: async (id) => {
            return new Promise((resolve,reject) =>{
                fetch(urlApi + `/${id}`)
                .then(librosAPI => librosAPI.json())
                .then(librosAPI => resolve(formatear(librosAPI)))
                .catch(error => reject(error))
            })
        },

    }


    function formatear(librosAPI) {
        if(!librosAPI || librosAPI.hasOwnProperty('error') || librosAPI.totalItems === 0){
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

function formatoBook (book){
    console.log(book)
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
    //console.log(losAtributosDelBook)
    return losAtributosDelBook
}

function formatearLista(librosAPI) {

    const maxBooks = 10
    let i = 0
    const lista = []

    while (i < maxBooks) {   // falta validacion de que haya libro

        const book = librosAPI.items[i].volumeInfo
        book.id = librosAPI.items[i].id
        const bookFormateado = formatoBook(book)
        lista.push(bookFormateado)

        i++
    }

    return lista

}


export { buscador }