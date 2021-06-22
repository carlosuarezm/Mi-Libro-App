import React, { useState, useEffect, useContext, useReducer } from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/tab.js'
import BookDetails from './screens/BookDetails.js';
import Login from './screens/Login'
import Camera from "./screens/Camera.js"
import Register from "./screens/CreateUser.js";
import { StatusBar } from 'expo-status-bar'
import { Constants } from 'expo-camera'
import AsyncStorage from "./utils/storage.js";
import BookState from './context/Book/BookState.js';
import BookContext from './context/Book/BookContext.js'
import BookReducer from './context/Book/BookReducer'
import UserState from './context/User/UserState.js';
import UserContext from './context/User/UserContext.js';
import UserReducer from './context/User/UserReducer'
import Home from './screens/Home.js';


const Stack = createStackNavigator()


const App = () => {
  const { state, setUserAuthenticated } = useContext(UserContext)

  const { fillBooksHistory, setBooksHistory } = useContext(BookContext)


  const checkUser = async () => {
    const user = await AsyncStorage.getData('@userData')
    if (user) {
      setUserAuthenticated(user)
    }
  }

  const checkBooksUser = async () => {
    const book = await AsyncStorage.getData('@booksHistory')
    // const books2 = await AsyncStorage.getData('@booksHistory_2')
    // const books3 = [books, books2]

    if (book) {
      setBooksHistory(book)
    }
  }

  useEffect(() => {
    checkUser()
    checkBooksUser()
  }, []);


  return (
    //Hay que ordenar esto para que se pueda hacer un LogOut correcto
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} /*initialRouteName={'Login'}*/>
        {!state ?
          <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
          </>
          :
          null
        }

        {/* Tabs */}
        <Stack.Screen name='Home' component={Tabs} />
        

        {/* Screens */}
        <Stack.Screen name='Camera' component={Camera} />
        <Stack.Screen name='BookDetails' component={BookDetails} options={{ headerShown: false }} />
      </Stack.Navigator>

      <StatusBar style='light' backgroundColor='#1E1B26' />
    </NavigationContainer>
  )
};

export default function AppWrapper() {
  return (
    <UserState>
      <BookState>
        <App />
      </BookState>
    </UserState>
  );
}











// const Stack = createStackNavigator()

// export default function App() {

//   //------------------- Book -------------------


//   const initialState1 = {
//     booksHistory: [],
//     favBooks: []
//   }

//   const [state1, dispatch1] = useReducer(BookReducer, initialState1);

//   //-------------------- Historial de Búsquedas --------------------
//   const fillBooksHistory = (books) => {
//     // if(!books){
//     //     books = AsyncStorage.getData('@keyHistorialLibros')
//     // }
//     dispatch1({
//       type: 'FILL_BOOKS_HISTORY',
//       payload: books
//     })
//   }

//   const deleteBookHistory = (book) => {
//     dispatch1({
//       type: 'DELETE_BOOK_HISTORY',
//       payload: book
//     })
//   }

//   //----------------------------------------------------------------


//   const fillFavBooks = (book) => {
//     // console.log('Estoy en el metodo fillFavBook de BookState')
//     // console.log(book)
//     dispatch1({
//       type: 'FILL_FAV_BOOKS',
//       payload: book
//     })
//   }

//   const deleteFavBook = (book) => {
//     // console.log('Estoy en el metodo fillFavBook de BookState')
//     // console.log(book)
//     dispatch1({
//       type: 'DELETE_FAV_BOOK',
//       payload: book
//     })
//   }




//   //------------------- User -------------------

//   const initialState2 = {}

//   const [state2, dispatch2] = useReducer(UserReducer, initialState2);

//   //-------------------- Historial de Búsquedas --------------------
//   const setUserAuthenticated = (user) => {
//     dispatch2({
//       type: 'SET_USER_AUTHENTICATED',
//       payload: user
//     })
//   }

//   const deleteUserAuthenticated = (user) => {
//     AsyncStorage.clearData()
//     dispatch2({
//       type: 'DELETE_USER_AUTHENTICATED',
//       payload: user
//     })
//   }




//   //------------------- App -------------------




//   // const { state, setUserAuthenticated } = useContext(UserContext)

//   // const { fillBooksHistory } = useContext(BookContext)


//   const checkUser = async () => {
//     console.log('Vamos a ver si existe el usuario')
//     const user = await AsyncStorage.getData('@userData')
//     console.log({ user })
//     if (user) {
//       setUserAuthenticated(user)
//     }
//     return user
//   }

//   const checkBooksUser = async () => {
//     const books = await AsyncStorage.getData('@booksHistory')
//     if (books) {
//       fillBooksHistory(books)
//     }
//   }

//   // const applyLogout= async() =>{
//   //   Storage.clearData()
//   //   setAuthenticated(false)
//   // }

//   // const [authenticated, setAuthenticated] = useState(false)

//   // if (state) {
//   //   const books = await Storage.storeData('@booksHistory', state)
//   //   fillBooksHistory(books)
//   // }


//   useEffect(() => {
//     const user = checkUser()
//     if (user) {
//       checkBooksUser()
//     }
//   }, [])

//   return (
//     <UserContext.Provider value={{
//       state2,
//       setUserAuthenticated,
//       deleteUserAuthenticated
//     }}>
//       <BookContext.Provider value={{
//         booksHistory: state1.booksHistory,
//         favBooks: state1.favBooks,
//         fillBooksHistory,
//         deleteBookHistory,
//         fillFavBooks,
//         deleteFavBook
//       }}>



//         <NavigationContainer>

//           <Stack.Navigator screenOptions={{ headerShown: false }} /*initialRouteName={'Login'}*/>

//             {!false ?
//               <>
//                 <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
//                 <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
//               </>
//               :
//               null
//             }

//             {/* Tabs */}
//             <Stack.Screen name='Home' component={Tabs} />

//             {/* Screens */}
//             <Stack.Screen name='Camera' component={Camera} />
//             <Stack.Screen name='BookDetails' component={BookDetails} options={{ headerShown: false }} />
//           </Stack.Navigator>

//           <StatusBar style='light' backgroundColor='#1E1B26' />
//         </NavigationContainer>



//       </BookContext.Provider>
//     </UserContext.Provider>







//   );
// }

