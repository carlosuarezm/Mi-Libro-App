import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image } from 'react-native'
import book1 from '../assets/cleancode.jpg'
import book2 from '../assets/harry.jpg'
import book3 from '../assets/gameofthrones.png'


const Home = ({ navigation }) => {

    const profileData = {
        name: 'Lee Wei Chun' 
    }

    const [profile, setProfile] = React.useState(profileData)

    function renderHeader(profile){

        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 24, alignItems: 'center'}}>
                {/* Saludo */}
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: 24 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 16, lineHeight: 22}}>Hola</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 22, lineHeight: 30}}>{profile.name}</Text>
                    </View>

                </View>

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
        description: 'asdsaddsad asdas d assadas dsa dasd asdd asdasd sa',
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
        description: 'asdsaddsad asdas d assadas dsa dasd asdd asdasd sa',
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
        description: 'asdsaddsad asdas d assadas dsa dasd asdd asdasd sa',
        backgroundColor: 'rgba(247, 239, 219, 0.9)',
        navTintColor: '#000'
    }

    const myBooksData = [bookCleanCode, bookHarry, bookGameOfThrones]

    const [myBooks, setMyBooks] = React.useState(myBooksData)


    function renderMyBookSection(myBooks){

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
                    <Text style={{marginLeft: 5, textAlign: 'left', width: 180, height: 200, color: '#FFFFFF'}}>{item.author}</Text>
                </View>
            </TouchableOpacity>
            )
        } 

        return(
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, lineHeight: 22, color: '#FFFFFF' }}>Mis Busquedas Recientes</Text>
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