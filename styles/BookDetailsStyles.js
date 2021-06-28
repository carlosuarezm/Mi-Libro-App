import { StyleSheet, StatusBar } from 'react-native'

const stylesBookDetails = StyleSheet.create({
    containerDescription: {
        flex: 1,
        flexDirection: 'column',
        padding:24
    },
    textTitleDescription: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        lineHeight: 30,
        color: '#FFFFFF',
        marginBottom: 24
    },
    textBookDescription: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        lineHeight: 30,
        color: '#64676D',
        textAlign: 'justify'
    },
    containerBookInfo: {
        flex: 0.8,
        flexDirection: 'row',
        paddingVertical: 20,
        margin: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent:'center',
        alignItems:'center'
    },
    itemsBookInfo: {
        flex: 1,
        alignItems: 'center'
    },
    textTitleItems: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    textDescriptionItems: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFFFFF'
    },
    containerBookNameAuthor: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bookName: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 30,
        color: '#000000',
        textAlign: 'center',
    },
    bookAuthor: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 22,
        color: '#000000',
        textAlign: 'center'
    },
    containerBookCover: {
        flex: 5,
        paddingTop: 36,
        alignItems: 'center'
    },
    bookCoverImage: {
        flex: 1,
        width: 150,
        height: 'auto'
    },
    textDetailTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 22,
        color: '#000000'
    },
    textDetailTitleNotLoggedIn: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 22,
        color: '#000000',
        paddingRight: 25
    },
    containerDetailTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerHeader: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        height: 80,
        alignItems: 'flex-end'
    },
    imageIconBack: {
        width: 25,
        height: 25,
        tintColor: '#000000'
    },
    colorOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(240, 240, 232, 0.9)'
    },
    imageBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    containerBookDetails: {
        flex: 1, 
        backgroundColor: '#1E1B26', 
        marginTop: StatusBar.currentHeight
    },
    containerDescriptionSection: {
        flex: 2.5
    },
    containerBookCoverSection: {
        flex: 4
    }
});

export { stylesBookDetails }