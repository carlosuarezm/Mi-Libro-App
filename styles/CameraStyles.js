import { StyleSheet, StatusBar } from 'react-native'

const stylesCamera = StyleSheet.create({
    containerCamera: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    camera: {
        flex: 1,
    },
    containerButtonsCamera: {
        flex: 0.2,
        flexDirection: 'row',
        backgroundColor: "#1E1B26",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    touchSwitchCamera: {
        left: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 1
    },
    imageSwitchCamera: {
        width: 48,
        height: 48
    },
    imageTakePhoto: {
        width: 60,
        height: 60
    },
    touchGallery: {
        right: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20
    },
    imageGallery: {
        width: 48,
        height: 48
    },
    containerLoading: {
        flex: 1, 
        justifyContent: "center", 
        flexDirection: "row", 
        padding: 10, 
        backgroundColor: '#1E1B26'
    }
});


export {stylesCamera}