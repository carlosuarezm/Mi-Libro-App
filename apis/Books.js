import book1 from '../assets/cleancode.jpg'
import book2 from '../assets/harry.jpg'
import book3 from '../assets/gameofthrones.png'
import book4 from '../assets/sherlock.jpg'

const bookCleanCode = {
    id:1,
    publishedDate: 2011,
    bookName: 'Clean Code',
    bookCover: book1,
    rating: 4.5,
    pageNo: 341,
    author: 'Robert C.Martin',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non pretium massa, in sagittis magna. Praesent velit odio, rhoncus sed diam ut, malesuada gravida nisl. Curabitur tempor aliquam aliquam. In elementum odio urna. Donec in venenatis sem. Aliquam tincidunt tellus vitae felis vehicula porttitor. Ut et orci sed enim rhoncus convallis. Nullam est urna, bibendum in sollicitudin sed, interdum quis lectus. Nulla in ultrices quam. Integer tortor nisl, venenatis ac accumsan in, fermentum nec dui. In et lobortis ex. Fusce lacinia augue vel nisl facilisis sodales. Etiam varius placerat risus, quis malesuada lectus consequat ut. Praesent sagittis lobortis nulla fringilla congue. Duis quis dapibus nibh.',
    backgroundColor: 'rgba(240, 240, 232, 0.9)',
    navTintColor: '#000'
}

const bookHarry = {
    id:"p3QQjwEACAAJ",
    publishedDate: 2005,
    bookName: 'Harry Potter',
    bookCover: book2,
    rating: 4.7,
    pageNo: 200,
    author: 'J.K. Rowling',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non pretium massa, in sagittis magna. Praesent velit odio, rhoncus sed diam ut, malesuada gravida nisl. Curabitur tempor aliquam aliquam. In elementum odio urna. Donec in venenatis sem. Aliquam tincidunt tellus vitae felis vehicula porttitor. Ut et orci sed enim rhoncus convallis. Nullam est urna, bibendum in sollicitudin sed, interdum quis lectus. Nulla in ultrices quam. Integer tortor nisl, venenatis ac accumsan in, fermentum nec dui. In et lobortis ex. Fusce lacinia augue vel nisl facilisis sodales. Etiam varius placerat risus, quis malesuada lectus consequat ut. Praesent sagittis lobortis nulla fringilla congue. Duis quis dapibus nibh.',
    backgroundColor: 'rgba(247, 239, 219, 0.9)',
    navTintColor: '#000'
}

const bookGameOfThrones = {
    id:3,
    publishedDate: 2015,
    bookName: 'Game of Thrones',
    bookCover: book3,
    rating: 4.9,
    pageNo: 412,
    author: 'George R.R. Martin',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non pretium massa, in sagittis magna. Praesent velit odio, rhoncus sed diam ut, malesuada gravida nisl. Curabitur tempor aliquam aliquam. In elementum odio urna. Donec in venenatis sem. Aliquam tincidunt tellus vitae felis vehicula porttitor. Ut et orci sed enim rhoncus convallis. Nullam est urna, bibendum in sollicitudin sed, interdum quis lectus. Nulla in ultrices quam. Integer tortor nisl, venenatis ac accumsan in, fermentum nec dui. In et lobortis ex. Fusce lacinia augue vel nisl facilisis sodales. Etiam varius placerat risus, quis malesuada lectus consequat ut. Praesent sagittis lobortis nulla fringilla congue. Duis quis dapibus nibh.',
    backgroundColor: 'rgba(247, 239, 219, 0.9)',
    navTintColor: '#000'
}

const bookSherlock = {
    id:4,
    publishedDate: 2003,
    bookName: 'Sherlock Holmes',
    bookCover: book4,
    rating: 5,
    pageNo: 200,
    author: 'Arthur Conan Doyle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non pretium massa, in sagittis magna. Praesent velit odio, rhoncus sed diam ut, malesuada gravida nisl. Curabitur tempor aliquam aliquam. In elementum odio urna. Donec in venenatis sem. Aliquam tincidunt tellus vitae felis vehicula porttitor. Ut et orci sed enim rhoncus convallis. Nullam est urna, bibendum in sollicitudin sed, interdum quis lectus. Nulla in ultrices quam. Integer tortor nisl, venenatis ac accumsan in, fermentum nec dui. In et lobortis ex. Fusce lacinia augue vel nisl facilisis sodales. Etiam varius placerat risus, quis malesuada lectus consequat ut. Praesent sagittis lobortis nulla fringilla congue. Duis quis dapibus nibh.',
    backgroundColor: 'rgba(247, 239, 219, 0.9)',
    navTintColor: '#000'
}

export default function getBooks(){
    return bookCleanCode
}

// export default function getBooks(...books){
//     return[books]
// }