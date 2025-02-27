import { Meal } from '@/types/meal';
import { useEffect, useState } from 'react';
import { StorageAPI } from '@/services/storageService';
import { getStorage } from '@/services/dependencies';

export const useMeals = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const storage = new StorageAPI(getStorage());

    useEffect(() => {
        const loadMeals = async () => {
            try {
                const storedMeals = await storage.get("meals");
                setMeals(storedMeals);
                const total = storedMeals.reduce((sum, meal) => sum + meal.amount, 0);
                setTotalAmount(total);
            } catch (error) {
                console.error("Failed to load meals:", error);
            }
        };
        loadMeals();
    }, []);

    const handleAddMeal = async (meal: Meal) => {
        try {
            const updatedMeals = [...meals, meal];
            setMeals(updatedMeals);
            setTotalAmount(totalAmount + meal.amount);
            await storage.store("meals", [meal]);
        } catch (error) {
            console.error("Failed to add meal:", error);
        }
    };

    const handleReset = async () => {
        try {
            setMeals([]);
            setTotalAmount(0);
            await storage.clear("meals");
        } catch (error) {
            console.error("Failed to reset meals:", error);
        }
    };


    return { meals, totalAmount, handleAddMeal, handleReset };
};