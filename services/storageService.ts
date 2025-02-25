import { Meal } from '@/types/meal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageAPI {
    async store(key: string, meals: Meal[]) {
        console.log("storing " + key + ": " + JSON.stringify(meals));
        try {
            const mealsString = JSON.stringify(meals);
            await AsyncStorage.setItem(key, mealsString);

        } catch (e) {
            console.log(e);
        }
    }

    async get(key: string): Promise<Meal[]> {
        try {
            const value = await AsyncStorage.getItem(key);
            console.log(key + ": " + value);
            if (value) {
                return JSON.parse(value) as Meal[];
            }
            return [];
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async clear() {
        AsyncStorage.clear();
    }
}