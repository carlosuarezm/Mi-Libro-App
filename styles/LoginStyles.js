import { StyleSheet, StatusBar } from 'react-native'

const stylesLogin = StyleSheet.create({
    containerLogin: { flex: 1, backgroundColor: '#1E1B26', alignItems: 'center', justifyContent: 'center', marginTop: StatusBar.currentHeight },
    skipContainer: {
        marginTop: 20
    },
    imageLogo: {
        width: 300,
        height: 150,
        borderRadius: 20
    },
    touchGoogle: {
        backgroundColor: '#FFFFFF',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5
    },
    containerGoogle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerImageGoogle: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageGoogle: {
        width: 27,
        height: 27
    },
    textGoogle: {
        marginLeft: 10, color: '#64676D', fontFamily: 'Roboto-Medium', fontSize: 16, lineHeight: 22
    },
    skipText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    }
});

export {stylesLogin}