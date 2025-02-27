import { Meal } from '@/types/meal';
import { useEffect, useState } from 'react';
import { StorageAPI } from '@/services/storageService';
import { FirebaseStorage } from '@/services/firebaseStorage';
import { MockStorage } from '@/services/mockStorage';

export const useMeals = () => {
    let db;
    if (process.env.NODE_ENV === "development") {
        db = new MockStorage<Meal>();
    } else {
        db = new FirebaseStorage<Meal>();
    }

    const [meals, setMeals] = useState<Meal[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const storage = new StorageAPI(db);

    useEffect(() => {
        const loadMeals = async () => {
            const storedMeals = await storage.get("meals");
            setMeals(storedMeals);
            const total = storedMeals.reduce((sum, meal) => sum + meal.amount, 0);
            setTotalAmount(total);
        };
        loadMeals();
    }, []);

    const handleAddMeal = async (meal: Meal) => {
        const updatedMeals = [...meals, meal];
        setMeals(updatedMeals);
        setTotalAmount(totalAmount + meal.amount);
        await storage.store("meals", [meal]);
    };

    const handleReset = async () => {
        setMeals([]);
        setTotalAmount(0);
        await storage.clear("meals");
    };


    return { meals, totalAmount, handleAddMeal, handleReset };
};