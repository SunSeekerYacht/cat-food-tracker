import { StorageInterface } from '../types/storageInterface';

export class MockStorage<T> implements StorageInterface {
    private meals: T[] = [];

    async setMeals(meals: T[]) {
        this.meals = meals;
    }

    async store(key: string, data: any) {
        console.log("mock store: " + key + " " + JSON.stringify(data));
    }

    async get(key: string): Promise<T[]> {
        console.log("mock get " + key);
        return this.meals;
    }

    async clear(key: string) {
        console.log("mock clear " + key);
        this.meals = [];
    }
};
