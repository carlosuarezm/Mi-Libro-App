import { StyleSheet, StatusBar, Dimensions } from 'react-native'

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.74;

const stylesFavorites = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E1B26'
    },
    container: {
        flex: 1,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        color: '#FFFFFF'
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
    favoritesContainer: {
        flex: 1,
        backgroundColor: '#1E1B26',
        marginTop: StatusBar.currentHeight
    },
    favoritesHeaderContainer: {
        flex: 0.5,
        paddingHorizontal: 24,
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    favoritesTextHeader: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    emptyFavoritesContainer: {
        flex: 3,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textEmptyFavorites: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        lineHeight: 22,
        color: '#64676D',
        textAlign: 'center'
    },
    imageBookCover: {
        width: 180,
        height: 280,
        borderRadius: 20
    },
    bookInfoContainer: {
        flexDirection: 'column',
        width: 180,
        height: 100,
        justifyContent: 'center',
        alignItems:'center'
    },
    bookName: {
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
        width: 180,
        color: '#000000'
    },
    authorName: {
        fontFamily: 'Roboto-Light',
        textAlign: 'center',
        marginTop: 10,
        width: 180,
        color: '#000000'
    },
    containerRating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageRating: {
        width:16, 
        height:16, 
        marginLeft:2
    }
});

export {stylesFavorites}