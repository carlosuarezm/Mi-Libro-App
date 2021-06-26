import Storage from "@react-native-async-storage/async-storage";

const AsyncStorage = {};

AsyncStorage.storeData = async (key, value) => {
    try {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        await Storage.setItem(key, value)
    } catch (error) {
        // Error guardando data
        console.log(error.message)
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
        console.log(error.message)
    }
}

AsyncStorage.removeData = async (key) => {
    try {
      await Storage.removeItem(key)
    } catch(e) {
      // remove error
      console.log(e)
    }
}

export default AsyncStorage;