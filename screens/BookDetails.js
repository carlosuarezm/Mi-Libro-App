import React from 'react'
import { Image } from 'react-native'
import { View, Text, ImageBackground, TouchableOpacity, ScrollView} from 'react-native'
import iconBack from '../assets/back.png'
import iconMore from '../assets/more.png'


const LineDivider = () => {
    return(
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View style={{ flex: 1, borderLeftColor: '#64676D', borderLeftWidth: 1 }}></View>
        </View>
    )
}

const BookDetail = ({route, navigation}) => {

    const [book, setBook] = React.useState(null)

    React.useEffect(() => {
        let {book} = route.params
        setBook(book)
    }, [book])

    function renderBookInfoSection(){
        return (
            <View style={{ flex: 1}}>
                <ImageBackground
                    source={book.bookCover}
                    resizeMode='cover'
                    style={{
                        position:'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }}
                />

                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: book.backgroundColor
                    }}
                >
                </View>

                {/* Navigation Header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: 12, height: 80, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ marginLeft: 8}}
                        onPress={() => navigation.goBack()}
                    >
                        <Image 
                            source={iconBack}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: book.navTintColor
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: book.navTintColor }}>Book Details</Text>
                    </View>

                    <TouchableOpacity
                        style={{ marginLeft: 8}}
                        onPress={() => console.log('Aca va la opcion para eliminar favoritos')}
                    >
                        <Image 
                            source={iconMore}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: book.navTintColor,
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>

                </View>


                {/* Book Cover */}
                <View style={{ flex: 5, paddingTop: 36, alignItems: 'center' }}>
                    <Image
                        source={book.bookCover}
                        resizeMode='contain'
                        style={{
                            flex: 1,
                            width: 150,
                            height: 'auto'
                        }}
                    />
                </View>

                {/* Book Name and Author */}
                <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: book.navTintColor }}>{book.bookName}</Text>
                        <Text style={{ color: book.navTintColor }}>{book.author}</Text>
                </View>

                {/* Book Info */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 20,
                        margin: 24,
                        borderRadius: 12,
                        backgroundColor: 'rgba(0,0,0,0.3)'
                    }}
                >
                    {/* Rating */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{color: '#FFFFFF'}}>{book.rating}
                        </Text>
                        <Text style={{color: '#FFFFFF'}}>Rating
                        </Text>
                    </View>

                    <LineDivider/>

                    {/* Pages */}
                    <View style={{ flex: 1, paddingHorizontal: 12, alignItems: 'center' }}>
                        <Text style={{color: '#FFFFFF'}}>{book.pageNo}
                        </Text>
                        <Text style={{color: '#FFFFFF'}}>Number of Page
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderBookDescription(){
        return(
            <View style={{ flex: 1, flexDirection: 'row', padding: 24 }}>
                <ScrollView
                    contentContainerStyle={{paddingLeft: 36}}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={{ color: '#FFFFFF', marginBottom: 24 }}>Description</Text>
                    <Text style={{ color: '#64676D' }} >{book.description}</Text>
                </ScrollView>
            </View>
        )
    }




    if(book){
        return(
            <View style={{ flex: 1, backgroundColor: '#1E1B26'}}>
                {/* Book Cover Section */}
                <View style={{ flex: 4 }}>
                    {renderBookInfoSection()}
                </View>

                {/* Description */}
                <View style={{ flex: 2 }}>
                    {renderBookDescription()}
                </View>

                {/* Buttons */}
                <View style={{ height: 70 }}></View>

            </View>
    
        )
    }else{
        return (<></>)
    }

}

export default BookDetail