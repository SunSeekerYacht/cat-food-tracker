import { Meal } from '@/types/meal';
import { StorageInterface } from '../types/storageInterface';

export class StorageAPI {
    private db: StorageInterface;

    constructor(db: StorageInterface) {
        this.db = db;
    }

    async store(key: string, meals: Meal[]) {
        console.log("storing " + key + ": " + JSON.stringify(meals));
        await this.db.store(key, meals);
    }

    async get(key: string): Promise<Meal[]> {
        console.log("getting " + key);
        return await this.db.get(key);
    }

    async clear(key: string) {
        console.log("clearing " + key);
        await this.db.clear(key);
    }
}