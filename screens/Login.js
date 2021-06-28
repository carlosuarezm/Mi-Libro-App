import React, { useState, useContext } from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth'
import logoApp from '../assets/images/logo.png'
import iconGoogle from '../assets/images/logogoogle.png'
import UserContext from '../context/User/UserContext.js';
import AsyncStorage from '../utils/storage.js';
import AppLoading from 'expo-app-loading'
import fetchFont from '../styles/fonts.js'
import { loadFavorites } from "../persistenciaFavs/db.js";
import { ANDROID_CLIENTE_ID } from "@env";
import { stylesLogin } from '../styles/LoginStyles.js';
import BookContext from '../context/Book/BookContext';


const Login = (props) => {
  const { setUserAuthenticated } = useContext(UserContext)
  const [fontLoaded, setFontLoaded] = useState(false)
  const { setBooksHistory } = useContext(BookContext)


  const handledGoogleSingIn = async () => {
    const config = {
      androidClientId: ANDROID_CLIENTE_ID,
      scopes: ['profile', 'email']
    }
    
    const { type, accessToken, user } = await Google.logInAsync(config);
    const res = { accessToken, user }
    
    if (type === 'success') {
      setBooksHistory({})
      await AsyncStorage.storeData('@userData', user)
      await AsyncStorage.removeData('@booksHistory')
      setUserAuthenticated(user)
      await loadFavorites(user.id)
      return res
    }
  }

  const loginGoogle = async () => {
    try {
      const res = await handledGoogleSingIn()

      if (res) {
        home()
      }

    } catch (error) {
      Alert.alert('¡Lo sentimos!', 'Error inesperado', [{text: 'ok'}])
    }
  }

  const home = async () => {
    props.navigation.navigate('Home')
  }

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFont}
      onError={() => console.log("ERROR en FONT")}
      onFinish={() => {
        setFontLoaded(true)
      }}
    />
  }

  return (
    <View style={stylesLogin.containerLogin}>
      <Image source={logoApp} resizeMode='cover' style={stylesLogin.imageLogo} />

      <View style={{ paddingTop: 50 }}>
        <TouchableOpacity style={stylesLogin.touchGoogle} onPress={loginGoogle}>
          <View style={stylesLogin.containerGoogle}>
            <View style={stylesLogin.containerImageGoogle}>
              <Image source={iconGoogle} resizeMode='contain' style={stylesLogin.imageGoogle} />
            </View>

            <Text style={stylesLogin.textGoogle}>Inicia sesión con Google</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={stylesLogin.skipContainer}>
        <TouchableOpacity onPress={home}>
          <Text style={stylesLogin.skipText}>Continuar sin loguearse</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login