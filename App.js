import React, {useState} from 'react';
import{createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Tabs from './navigation/tab.js'
import BookDetails from './screens/BookDetails.js';
import Login from './screens/Login'
import Camera from "./screens/camera.js"
import {StatusBar} from 'expo-status-bar'


const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Camera'}
      >
        {/* Tabs */}
        
        <Stack.Screen name='Home' component={Tabs}/>

        {/* Screens */}
        <Stack.Screen name='Camera' component={Camera}/>
        <Stack.Screen name='BookDetails' component={BookDetails} options={{ headerShown: false }}/>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>

      {/* <StatusBar backgroundColor='#FFFFFF'/> */}
    </NavigationContainer> 
  );
}

