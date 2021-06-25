import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, StatusBar } from 'react-native';
import firebase from '../firebase/fire.js'
import "firebase/auth";
import { SocialIcon } from 'react-native-elements'
import * as Google from 'expo-google-app-auth'
import logoApp from '../assets/logo.png'
import UserContext from '../context/User/UserContext.js';
import AsyncStorage from '../utils/storage.js';
import iconGoogle from '../assets/logogoogle.png'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'


const Login = (props) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState('');

  const { setUserAuthenticated } = useContext(UserContext)

  const handledGoogleSingIn = async () => {
    const config = {
      androidClientId: "628836821863-5jhatmlvu7hm5s6073dd9pl2vtpvciv5.apps.googleusercontent.com",
      scopes: ['profile', 'email']
    }

    const { type, accessToken, user } = await Google.logInAsync(config);
    const res = { accessToken, user }

    if (type === 'success') {
      console.log('Datos de Google')
      console.log(user)
      // console.log('token', accessToken)
      await AsyncStorage.storeData('@userData', user)
      setUserAuthenticated(user)
      return res
    }
  }

  const loginGoogle = async () => {
    const res = await handledGoogleSingIn()

    if (res) {
      setTimeout(async () => {
        console.log(res.user)
        home()
      }, 300);
    }


  }

  const loginUser = async () => {
    try {
      let aut = await firebase.auth().signInWithEmailAndPassword(email, password);
      await AsyncStorage.storeData('@userData', aut)
      console.log('Nombre de Firebase')
      console.log(aut)
      home()

    } catch (err) {
      console.log(err)
      if (!email || err.code == "auth/argument-error") {
        err.message = "Ingrese datos"
      } else if (err.code == "auth/invalid-email") {
        err.message = "La dirección de mail es inválida"
      } else if (err.code == "auth/user-not-found" || "auth/wrong-password") {
        err.message = "Usuario o contraseña inválida"
      }
      setError(err.message);
    }
  }
  const home = async () => {
    props.navigation.navigate('Home')
  }

  const register = () => {
    props.navigation.navigate('Register')

  }

  const [fontLoaded, setFontLoaded] = useState(false)


  const fetchFont = async () => {
    await Font.loadAsync({
        'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf')
    })
  } 

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFont}
        onError={() => console.log("ERROR")}
        onFinish={() => {
            setFontLoaded(true)
        }}
    />
  }


  return (
    <View style={styles.container}>

      {/* <Text style={styles.title}>Bienvenid@s a MiLibro!</Text> */}
      <Image
        source={logoApp}
        resizeMode='cover'
        style={{
          width: 300,
          height: 150,
          borderRadius: 20
        }}
      />

      {/* <Text style={styles.text}>
        Email
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setEmail}
        value={email}
        placeholder="Ingrese su email"
      />

      <Text style={styles.text}>
        Contraseña
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setPassword}
        value={password}
        placeholder="Ingrese su contraseña"
        keyboardType="default"
        secureTextEntry={true}
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={loginUser} style={styles.button}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={register} style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View> */}

      <View style={{paddingTop: 50}}>
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

        {/* <SocialIcon type="google" style={styles.googlelButton} onPress={loginGoogle} /> */}
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