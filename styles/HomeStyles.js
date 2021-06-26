import { StyleSheet, StatusBar } from 'react-native'

const stylesHome = StyleSheet.create({
    touchCamera: {
        backgroundColor: '#F96D41',
        height: 50,
        paddingLeft: 3,
        paddingRight: 12,
        borderRadius: 20,
        width: 150
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageCameraContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    textCamera: {
        marginLeft: 8,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 22
    },
    headerBookSection: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeaderBookSection: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        lineHeight: 21,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    booksContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    textBooks: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 22,
        color: '#64676D',
        textAlign: 'center'
    },
    bookContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchBook: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBook: {
        width: 180,
        height: 230,
        borderRadius: 3
    },
    bookInfoContainer: {
        marginTop: 12,
        flexDirection: 'row',
        width: 180,
        height: 25,
        justifyContent: 'center'
    },
    textBookInfo: {
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        width: 180,
        height: 200,
        color: '#FFFFFF'
    },
    headerGreeting: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Thin',
        fontSize: 16,
        lineHeight: 22
    },
    headerText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        lineHeight: 30
    },
    headerLoggedIn: {
        flex: 1,
        marginTop: 50
    },
    touchButtonHeader: {
        backgroundColor: '#364156',
        height: 40,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 20,
        marginTop: 50
    },
    touchImageButtonHeader: {
        flex: 1,
        flexDirection: 'row',
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    imageCamera: {
        width: 20,
        height: 20
    },
    containerHome: {
        flex: 1, 
        backgroundColor: '#1E1B26', 
        marginTop: StatusBar.currentHeight
    },
    containerHeaderSection: {
        flex: 1, 
        flexDirection: 'row', 
        paddingHorizontal: 24, 
        alignItems: 'center'
    },
    containerBooksSection: {
        flex: 3 
    },
    containerCameraSection: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }

})

export {stylesHome}