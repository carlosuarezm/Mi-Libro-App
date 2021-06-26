import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/tab.js'
import BookDetails from './screens/BookDetails.js';
import Login from './screens/Login'
import Camera from "./screens/Camera.js"
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from "./utils/storage.js";
import BookState from './context/Book/BookState.js';
import BookContext from './context/Book/BookContext.js'
import UserState from './context/User/UserState.js';
import UserContext from './context/User/UserContext.js';


const Stack = createStackNavigator()

const App = () => {
  const { state, setUserAuthenticated } = useContext(UserContext)
  const { setBooksHistory } = useContext(BookContext)

  const checkUser = async () => {
    const user = await AsyncStorage.getData('@userData')
    if (user) {
      console.log('APP - Vamos a setear al Contexto el Usuario')
      console.log(user)
      setUserAuthenticated(user)
    }
    return user
  }

  const checkBooksUser = async () => {
    const book = await AsyncStorage.getData('@booksHistory')
    if (book) {
      setBooksHistory(book)
    }
  }

  useEffect(() => {
    checkUser()
    checkBooksUser()
  }, []);

  console.log('APP - El Estado del Usuario es: ')
  console.log(state)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} /*initialRouteName={'Login'}*/>
        {!state
          ?
          <>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Home' component={Tabs}/>
          </>
          :
          <>
            <Stack.Screen name='Home' component={Tabs}/>
            <Stack.Screen name='Login' component={Login}/>
          </>
        }
        
        <Stack.Screen name='Camera' component={Camera}/>
        <Stack.Screen name='BookDetails' component={BookDetails}/>
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