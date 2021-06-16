import React, {useState} from 'react';
import{createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Tabs from './navigation/tab.js'
import BookDetails from './screens/BookDetails.js';
import Login from './screens/Login'
import Camera from "./screens/Camera.js"
import {StatusBar} from 'expo-status-bar'
import { DataProvider } from './context/DataContext.js';
import BookState from './context/Book/BookState.js';


const Stack = createStackNavigator()

export default function App() {

  return (
    <BookState>
    {/* <DataProvider> */}
      <NavigationContainer>
        
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Login'}>
          
          {/* Tabs */}
          <Stack.Screen name='Home' component={Tabs}/>

          {/* Screens */}
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name='Camera' component={Camera}/>
          <Stack.Screen name='BookDetails' component={BookDetails} options={{ headerShown: false }}/>
        </Stack.Navigator>

        <StatusBar style='light' backgroundColor='#1E1B26'/>
      </NavigationContainer> 
    {/* </DataProvider> */}
    </BookState>
  );
}

