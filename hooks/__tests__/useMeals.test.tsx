import { renderHook, waitFor, act } from "@testing-library/react-native";
import { useMeals } from '../useMeals';
import { Meal } from '@/types/meal';
import { MockStorage } from '@/services/mockStorage';

describe('useMeals', () => {
    const meal = {
        type: "Nass",
        amount: 80,
        kuroAmount: 40,
        yukiAmount: 40,
        timestamp: "12:00",
    }
    const storedMeals: Meal[] = [meal];

    it('should load meals from storage on mount', async () => {
        const mockStorage = new MockStorage<Meal>;
        mockStorage.setMeals(storedMeals);
        const { result } = renderHook(() => useMeals(mockStorage));

        await waitFor(() => {
            expect(result.current.meals).toEqual(storedMeals);
            expect(result.current.totalAmount).toBe(80);
        });
    });

    it('should add a meal and update state', async () => {
        const mockStorage = new MockStorage<Meal>;
        mockStorage.setMeals(storedMeals);
        const newMeal: Meal = meal;

        const { result } = renderHook(() => useMeals(mockStorage));

        await act(async () => {
            await result.current.handleAddMeal(newMeal);
        });

        await waitFor(() => {
            expect(result.current.meals).toEqual([newMeal]);
            expect(result.current.totalAmount).toBe(80);
        });
    });


    it('should reset meals and update state', async () => {
        const mockStorage = new MockStorage<Meal>;
        mockStorage.setMeals(storedMeals);
        const newMeal: Meal = meal;

        const { result } = renderHook(() => useMeals(mockStorage));

        await waitFor(() => {
            expect(result.current.meals).toEqual(storedMeals);
            expect(result.current.totalAmount).toBe(80);
        });

        await act(async () => {
            await result.current.handleReset();
        });

        await waitFor(() => {
            expect(result.current.meals).toEqual([]);
            expect(result.current.totalAmount).toBe(0);
        });
    });
});
