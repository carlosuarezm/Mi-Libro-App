import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image,TouchableOpacity  } from 'react-native';

const Gallery = () => {

    const [selectedImage, setSelectedImage] = useState(null)

    //********** */ Browser en la galeria de Imagenes pidiendo permiso
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
       
        if (permissionResult.granted === false){
          alert('Permission to access media library is required ')
          return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync()
        console.log('1-',pickerResult)
  
        if(pickerResult.cancelled === true){
          return;
        }
        setSelectedImage({localUri: pickerResult.uri})
    } 

    let imgUrl = selectedImage !== null ? { uri: selectedImage.localUri } : require('../assets/miLibro.png')
    console.log('2-',imgUrl)
   
   
   
    return(
        <View style={styles.container}> 
        <Text style={styles.title}>Seleccione un libro de la galeria</Text>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Galeria de Imagenes</Text>
        </TouchableOpacity>
        <Image 
          source={ imgUrl }
          style={styles.image}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',},
    title: { fontSize: 15,  fontWeight: 'bold' },
    image: {height:200, width: 200, borderColor: 'black', borderWidth: 1, marginTop: 25, 
    borderTopLeftRadius:100,
    borderTopRightRadius:100,
    borderBottomLeftRadius:100,
    borderBottomRightRadius:100,
    resizeMode: 'contain'
    },
    input: { height: 40, margin: 12, borderWidth: 1 },
    button: {backgroundColor: 'deepskyblue', padding: 7, marginTop: 10 },
    buttonText: { color: '#fff'}
  });
  


export default Gallery