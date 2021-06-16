import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/tab.js'
import BookDetails from './screens/BookDetails.js';
import Login from './screens/Login'
import Camera from "./screens/Camera.js"
import Register from "./screens/CreateUser.js";
import { StatusBar } from 'expo-status-bar'
import BookState from './context/Book/BookState.js';
import Storage from "./funciones/storage.js";


const Stack = createStackNavigator()

export default function App() {
 
  const checkUser = async () =>{
    console.log('Vamos a ver si existe data')

    const user = await Storage.getData('@userData')
    console.log({user})
    if (user){
      setAuthenticated(true)
    }
  }

  const applyLogout= async() =>{
    Storage.clearData()
    setAuthenticated(false)
  }
  

  useEffect(() => {
    checkUser()
  }, [])

  const [authenticated, setAuthenticated] = useState(true)  

  return (
    <BookState>

      <NavigationContainer>

        <Stack.Navigator screenOptions={{ headerShown: false }} /*initialRouteName={'Login'}*/>

          {!authenticated ?
            <>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            </>
            :
            null
          }

          {/* Tabs */}
          <Stack.Screen name='Home' component={Tabs}/>

          {/* Screens */}
          <Stack.Screen name='Camera' component={Camera} />
          <Stack.Screen name='BookDetails' component={BookDetails} options={{ headerShown: false }}/>
        </Stack.Navigator>

        <StatusBar style='light' backgroundColor='#1E1B26' />
      </NavigationContainer>

    </BookState>
  );
}

