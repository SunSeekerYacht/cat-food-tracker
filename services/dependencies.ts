import { Meal } from '@/types/meal';
import { FirebaseStorage } from '@/services/firebaseStorage';
import { MockStorage } from '@/services/mockStorage';
import { StorageInterface } from '@/types/storageInterface';

function getStorage() {
    let db: StorageInterface;
    if (process.env.NODE_ENV === "development") {
        db = new MockStorage<Meal>();
    } else {
        db = new FirebaseStorage<Meal>();
    }
    return db;
}

export { getStorage };
