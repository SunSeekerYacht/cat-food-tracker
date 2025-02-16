import { useState } from 'react';

export const useInput = () => {
    const [showInput, setShowInput] = useState(false);

    const toggleInput = () => {
        setShowInput(!showInput);
    };

    return { showInput, toggleInput };
};