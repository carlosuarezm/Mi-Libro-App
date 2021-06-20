import axios from 'axios' 
// import { API_VISION_KEY } from '@env';
const API_VISION_KEY ='AIzaSyDJa3VCojDukuMXi86rKk4RhoOv4wDoc8Q'
const urlAPI = "https://www.googleapis.com/books/v1/volumes"


    
    const buscador = {

        libroPorReconocimiento : async (query) => {
            const {data: libro} = await axios.get(urlAPI + `?q=${query}&maxResults=1&key=${API_VISION_KEY}`)
            
            return formatear(libro)
            /* new Promise((resolve, reject) =>{
                fetch(urlAPI + `?q=${query}`)
                .then(librosAPI => librosAPI.json())
                .then(librosAPI => resolve(formatear(librosAPI)))
                .catch(error => reject(error))
            }) */
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


function formatear (librosAPI){
    //console.log(librosAPI)
    if(!librosAPI.items[0].volumeInfo){
        throw new Error('No se encontraron resultados, intente nuevamente')
    }
    const libro = librosAPI.items[0].volumeInfo
    libro.id = librosAPI.items[0].id

    //const book = librosAPI.items[0].volumeInfo  
    const bookFormateado = formatoBook(libro)    
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

function formatearLista (librosAPI){
    const maxBooks = 10
    let i = 0
    const lista = []

    while (i<maxBooks) {

        const book = librosAPI.items[i].volumeInfo
        const bookFormateado = formatoBook(book)
        lista.push(bookFormateado)
        
        i++
    }

    return lista
}

export { buscador }