import React from 'react';
import { render } from '@testing-library/react-native';
import MealItem from '../MealItem';

describe('MealItem Component', () => {
    const meal = {
        timestamp: '00:00',
        type: 'Dry Food',
        amount: 50,
        kuroAmount: 30,
        yukiAmount: 20,
    };

    it('renders morning correctly', () => {
        meal.timestamp = '08:00';
        const { getByText } = render(<MealItem meal={meal} />);
        expect(getByText('🌅 Uhrzeit: 08:00')).toBeTruthy();
    });

    it('renders noon correctly', () => {
        meal.timestamp = '12:00';
        const { getByText } = render(<MealItem meal={meal} />);
        expect(getByText('☀️ Uhrzeit: 12:00')).toBeTruthy();
    });

    it('renders evening correctly', () => {
        meal.timestamp = '19:00';
        const { getByText } = render(<MealItem meal={meal} />);
        expect(getByText('🌙 Uhrzeit: 19:00')).toBeTruthy();
    });
});
