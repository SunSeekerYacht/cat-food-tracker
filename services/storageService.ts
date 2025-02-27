import { Meal } from '@/types/meal';
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);

export { db }


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