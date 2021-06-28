import Storage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const AsyncStorage = {};

AsyncStorage.storeData = async (key, value) => {
    try {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        await Storage.setItem(key, value)
    } catch (error) {
        Alert.alert('¡Lo sentimos!', 'Error inesperado', [{text: 'ok'}])
    }
}

AsyncStorage.getData = async (key) => {
    try {
        const value = await Storage.getItem(key)
        return JSON.parse(value)
    } catch (error) {
        return null
    }
}

AsyncStorage.clearData = async () => {
    try {
        await Storage.clear()
    } catch (error) {
        Alert.alert('¡Lo sentimos!', 'Error inesperado', [{text: 'ok'}])
    }
}

AsyncStorage.removeData = async (key) => {
    try {
        await Storage.removeItem(key)
    } catch (e) {
        Alert.alert('¡Lo sentimos!', 'Error inesperado', [{text: 'ok'}])
    }
}

export default AsyncStorage;