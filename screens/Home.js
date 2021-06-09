import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image } from 'react-native'
import book1 from '../assets/cleancode.jpg'
import book2 from '../assets/harry.jpg'
import book3 from '../assets/gameofthrones.png'
import iconCamera from '../assets/camera.png'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

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


const Home = ({ navigation }) => {

    const [fontLoaded, setFontLoaded] = useState(false)

    const profileData = {
        name: 'Lee Wei Chun' 
    }

    const [profile, setProfile] = React.useState(profileData)

    function renderHeader(profile){
            
        if(!fontLoaded){
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }

        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 24, alignItems: 'center'}}>
                {/* Saludo */}
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: 24 }}>
                        <Text style={{ color: '#FFFFFF', fontFamily:'Roboto-Thin', fontSize: 16, lineHeight: 22}}>Hola</Text>
                        <Text style={{ color: '#FFFFFF', fontFamily:'Roboto-Medium', fontSize: 22, lineHeight: 30}}>{profile.name}</Text>
                    </View>
                </View>


                {/* Camera */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#F96D41',
                        height: 40,
                        paddingLeft: 3,
                        paddingRight: 12,
                        borderRadius: 20
                    }}
                    onPress={() => navigation.navigate("Camera")}
                >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width:30, height: 30, alignItems: 'center', justifyContent: 'center', 
                        borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <Image
                                source={iconCamera}
                                resizeMode='contain'
                                style={{
                                    width:20,
                                    height:20
                                }}
                            />
                        </View>
                        
                        <Text style={{ marginLeft: 8, color: '#FFFFFF', fontFamily:'Roboto-Regular', fontSize: 16, lineHeight: 22 }}>Buscar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const bookCleanCode = {
        id:1,
        bookName: 'Clean Code',
        bookCover: book1,
        rating: 4.5,
        pageNo: 341,
        author: 'Robert C.Martin',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non pretium massa, in sagittis magna. Praesent velit odio, rhoncus sed diam ut, malesuada gravida nisl. Curabitur tempor aliquam aliquam. In elementum odio urna. Donec in venenatis sem. Aliquam tincidunt tellus vitae felis vehicula porttitor. Ut et orci sed enim rhoncus convallis. Nullam est urna, bibendum in sollicitudin sed, interdum quis lectus. Nulla in ultrices quam. Integer tortor nisl, venenatis ac accumsan in, fermentum nec dui. In et lobortis ex. Fusce lacinia augue vel nisl facilisis sodales. Etiam varius placerat risus, quis malesuada lectus consequat ut. Praesent sagittis lobortis nulla fringilla congue. Duis quis dapibus nibh.',
        backgroundColor: 'rgba(240, 240, 232, 0.9)',
        navTintColor: '#000'
    }

    const bookHarry = {
        id:2,
        bookName: 'Harry Potter',
        bookCover: book2,
        rating: 4.7,
        pageNo: 200,
        author: 'J.K. Rowling',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non pretium massa, in sagittis magna. Praesent velit odio, rhoncus sed diam ut, malesuada gravida nisl. Curabitur tempor aliquam aliquam. In elementum odio urna. Donec in venenatis sem. Aliquam tincidunt tellus vitae felis vehicula porttitor. Ut et orci sed enim rhoncus convallis. Nullam est urna, bibendum in sollicitudin sed, interdum quis lectus. Nulla in ultrices quam. Integer tortor nisl, venenatis ac accumsan in, fermentum nec dui. In et lobortis ex. Fusce lacinia augue vel nisl facilisis sodales. Etiam varius placerat risus, quis malesuada lectus consequat ut. Praesent sagittis lobortis nulla fringilla congue. Duis quis dapibus nibh.',
        backgroundColor: 'rgba(247, 239, 219, 0.9)',
        navTintColor: '#000'
    }
    
    const bookGameOfThrones = {
        id:3,
        bookName: 'Game of Thrones',
        bookCover: book3,
        rating: 4.9,
        pageNo: 412,
        author: 'George R.R. Martin',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non pretium massa, in sagittis magna. Praesent velit odio, rhoncus sed diam ut, malesuada gravida nisl. Curabitur tempor aliquam aliquam. In elementum odio urna. Donec in venenatis sem. Aliquam tincidunt tellus vitae felis vehicula porttitor. Ut et orci sed enim rhoncus convallis. Nullam est urna, bibendum in sollicitudin sed, interdum quis lectus. Nulla in ultrices quam. Integer tortor nisl, venenatis ac accumsan in, fermentum nec dui. In et lobortis ex. Fusce lacinia augue vel nisl facilisis sodales. Etiam varius placerat risus, quis malesuada lectus consequat ut. Praesent sagittis lobortis nulla fringilla congue. Duis quis dapibus nibh.',
        backgroundColor: 'rgba(247, 239, 219, 0.9)',
        navTintColor: '#000'
    }

    const myBooksData = [bookCleanCode, bookHarry, bookGameOfThrones]

    const [myBooks, setMyBooks] = React.useState(myBooksData)


    function renderMyBookSection(myBooks){

        if(!fontLoaded){
            return <AppLoading startAsync={fetchFont}
                onError={() => console.log("ERROR")}
                onFinish={() => {
                    setFontLoaded(true)
                }}
            />
        }

        const renderItem = ({item, index}) => {

            return (
                <TouchableOpacity
                style={{
                    flex:1,
                    marginLeft: index == 0 ? 24 : 0,
                    marginRight: 12,
                }}
                onPress={() => navigation.navigate("BookDetails", {
                    book: item
                })}
                > 

                {/* Book Cover */}
                <Image
                    source={item.bookCover}
                    resizeMode='cover'
                    style={{
                        width: 180,
                        height:250,
                        borderRadius: 20
                    }}
                />

                {/* Book Info */}
                <View style={{ marginTop: 12, flexDirection: 'row', width: 180, height: 200, justifyContent: 'center'}}>
                    <Text style={{fontFamily:'Roboto-Regular', marginLeft: 5, textAlign: 'center', width: 180, height: 200, color: '#FFFFFF'}}>{item.author}</Text>
                </View>
            </TouchableOpacity>
            )
        } 

        return(
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{fontFamily:'Roboto-Bold', fontSize: 16, lineHeight: 22, color: '#FFFFFF' }}>Mis Busquedas Recientes</Text>
                </View>

                {/* Books */}
                <View style={{ flex:1, marginTop: 24 }}>
                    <FlatList
                        data={myBooks}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }


    return (
       <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26'}}>
            {/* Header Section */}
            <View style={{ height: 200 }}>
                {renderHeader(profile)}
            </View>

            {/* Body Section */}
            <ScrollView style={{ marginTop: 12 }}>
                {/* Books Section */}
                <View>
                    {renderMyBookSection(myBooks)}
                </View>

                {/* Categories Section */}

            </ScrollView>
       </SafeAreaView>

    )
}


export default Home