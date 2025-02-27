import { Meal } from '@/types/meal';
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '@/services/firebase';


export class StorageAPI {
    async store(key: string, meals: Meal[]) {
        console.log("storing " + key + ": " + JSON.stringify(meals));
        try {
            for (const meal of meals) {
                const docRef = await addDoc(collection(db, key), meal);
                console.log("Document written with ID: ", docRef.id);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async get(key: string): Promise<Meal[]> {
        const querySnapshot = await getDocs(collection(db, key));
        return querySnapshot.docs.map(doc => doc.data()) as Meal[];
    }

    async clear(key: string) {
        const querySnapshot = await getDocs(collection(db, key));
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    }
}