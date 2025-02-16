import { Meal } from '@/types/meal';
import { useState } from 'react';

export const useMeals = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const handleAddMeal = (meal: Meal) => {
        setMeals([...meals, meal]);
        setTotalAmount(totalAmount + meal.amount);
    };

    const handleReset = () => {
        setMeals([]);
        setTotalAmount(0);
    };


    return { meals, totalAmount, handleAddMeal, handleReset };
};