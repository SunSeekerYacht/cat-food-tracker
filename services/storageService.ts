import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageAPI {
    async store(key: string, xp: number) {
        console.log("storing " + key + ": " + xp);
        try {
            await AsyncStorage.setItem(key, xp.toString());
        } catch (e) {
            console.log(e);
        }
    }

    async get(key: string) {
        try {
            const value = await AsyncStorage.getItem(key);
            console.log(key + ": " + value);
            return value !== null ? Number(value) : 0;
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    async clear() {
        AsyncStorage.clear();
    }
}