import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import firebase from '../firebase/fire.js'
import "firebase/auth";


const CreateUser = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = useState(true)


  const generateUser = async () => {
    try {
      if (password != confirmPassword) {
        throw new Error('Las contraseñas deben coincidir')
      }
      (await firebase.auth().createUserWithEmailAndPassword(email, password));
      alert('Se ha registrado correctamente')
      props.navigation.navigate('Login')
    } catch (err) {
      setError(err.message);
    }
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a account</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />

      <Text style={styles.text}>Contraseña</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña (6 a 8 dígitos)"
        keyboardType="default"
        secureTextEntry={true}
      />
      {
        error ? <Text style={{ color: 'red' }}>{error}</Text> : null
      }

      <Text style={styles.text}>Confirmar Contraseña</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirmar Contraseña"
        keyboardType="default"
        secureTextEntry={true}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={generateUser} style={styles.button}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'cadetblue', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: 'bold', color: 'white' },
  text: { fontSize: 12, marginTop: 10, fontWeight: 'bold', color: 'white' },
  textInput: { width: '90%', padding: 10, borderWidth: 0, backgroundColor: 'white', borderRadius: 100 },

  button: { backgroundColor: 'rgb(7, 69, 71)', padding: 10, width: "48%", borderRadius: 100, marginTop: 10, alignSelf: 'center' },
  buttonText: { fontSize: 16, color: 'white', alignSelf: 'center', fontWeight: 'bold' },

  btnContainer: {
    width: "90%"
  }

});

export default CreateUser