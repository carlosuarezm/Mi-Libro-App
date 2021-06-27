import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import * as Google from 'expo-google-app-auth'
import logoApp from '../assets/logo.png'
import UserContext from '../context/User/UserContext.js';
import AsyncStorage from '../utils/storage.js';
import iconGoogle from '../assets/logogoogle.png'
import AppLoading from 'expo-app-loading'
import fetchFont from '../styles/fonts.js'
import { getFavorites } from "../persistenciaFavs/db.js";
import { ANDROID_CLIENTE_ID } from "@env";


const Login = (props) => {

  const [error, setError] = useState('');

  const { setUserAuthenticated } = useContext(UserContext)

  const handledGoogleSingIn = async () => {
    const config = {
      androidClientId: ANDROID_CLIENTE_ID,
      scopes: ['profile', 'email']
    }
    const res = { accessToken, user }

    const { type, accessToken, user } = await Google.logInAsync(config);

    if (type === 'success') {
      await AsyncStorage.storeData('@userData', user)
      setUserAuthenticated(user)
      await getFavorites(user.id)
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
      alert('Error inesperado')
    }
  }

  const home = async () => {
    props.navigation.navigate('Home')
  }

  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFont}
      onError={() => console.log("ERROR en FONT")}
      onFinish={() => {
        setFontLoaded(true)
      }}
    />
  }


  return (
    <View style={styles.container}>
      <Image
        source={logoApp}
        resizeMode='cover'
        style={{
          width: 300,
          height: 150,
          borderRadius: 20
        }}
      />

      <View style={{ paddingTop: 50 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            height: 50,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 5
          }}
          onPress={loginGoogle}
        >
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              width: 30, height: 30, alignItems: 'center', justifyContent: 'center',
            }}>
              <Image
                source={iconGoogle}
                resizeMode='contain'
                style={{
                  width: 27,
                  height: 27
                }}
              />
            </View>

            <Text style={{ marginLeft: 10, color: '#64676D', fontFamily: 'Roboto-Medium', fontSize: 16, lineHeight: 22 }}>Sing in with Google</Text>
          </View>
        </TouchableOpacity>

      </View>

      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={home}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>Continuar sin loguearse</Text>
        </TouchableOpacity>
      </View>

      {
        error ? <Text style={{ color: 'red' }}>{error}</Text> : null
      }
    </View>

  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B26', alignItems: 'center', justifyContent: 'center', marginTop: StatusBar.currentHeight },
  title: { fontSize: 30, fontWeight: 'bold', color: 'white' },
  text: { fontSize: 12, marginTop: 18, fontWeight: 'bold', color: 'white', textAlign: 'left' },
  textInput: { width: '90%', marginBottom: 10, padding: 10, borderWidth: 0, backgroundColor: 'white', borderRadius: 100, },

  button: { backgroundColor: '#0a8e96', padding: 15, width: "48%", borderRadius: 100 },
  buttonText: { fontSize: 16, color: 'white', alignSelf: 'center', fontWeight: 'bold' },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"

  },

  googlelButton: {
    backgroundColor: "#0a8e96",
  },

  googleContainer: {
    paddingTop: 50,
    marginTop: 5
  },
  skipContainer: {
    marginTop: 20
  },
  buttonSkip: {
    backgroundColor: '#0a8e96', padding: 15, width: "75%", borderRadius: 100
  }
});

export default Login