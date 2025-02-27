import { db } from '@/services/firebase';
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { StorageInterface } from '../types/storageInterface';

export class FirebaseStorage<T> implements StorageInterface {
    async store(key: string, data: any) {
        try {
            for (const item of data) {
                const docRef = await addDoc(collection(db, key), item);
                console.log("Document written with ID: ", docRef.id);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async get(key: string,): Promise<T[]> {
        const querySnapshot = await getDocs(collection(db, key));
        return querySnapshot.docs.map(doc => doc.data()) as T[];
    }

    async clear(key: string) {
        const querySnapshot = await getDocs(collection(db, key));
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    }
};
