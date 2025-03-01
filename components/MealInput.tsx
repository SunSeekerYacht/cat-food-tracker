import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

import { Meal } from "@/types/meal";

export default function MealInput({ onSave }: { onSave: (meal: Meal) => void }) {
    enum FoodType {
        Wet = "Nass",
        Dry = "Trocken"
    }

    const [foodType, setFoodType] = useState<FoodType>(FoodType.Wet);
    const [amount, setAmount] = useState<number>(85);
    const [kuroAmount, setKuroAmount] = useState<number>(amount / 2);
    const [yukiAmount, setYukiAmount] = useState<number>(amount / 2);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const handleKuroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKuroAmount(Number(e.target.value));
        setAmount(kuroAmount + yukiAmount);
    };

    const handleYukiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYukiAmount(Number(e.target.value));
        setAmount(kuroAmount + yukiAmount);
    };

    const meal = {
        type: foodType,
        amount: amount,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        kuroAmount: kuroAmount,
        yukiAmount: yukiAmount
    }


    return (
        <View>
            <View style={styles.mealInputContainer}>
                <Text style={styles.title}>Neue Mahlzeit</Text>
                <View style={styles.mealInputContainerRow}>
                    <View style={styles.mealInputContainerGeneral}>
                        <Text style={styles.label}>Art:</Text>
                        <select style={styles.select} name="type" value={foodType} onChange={(e) => setFoodType(e.target.value as FoodType)}>
                            <option value={FoodType.Dry}>{FoodType.Dry}</option>
                            <option value={FoodType.Wet}>{FoodType.Wet}</option>
                        </select>
                        <Text style={styles.label}>Menge:</Text>
                        <input style={styles.input} type="number" name="amount" value={amount} onChange={handleAmountChange}></input>
                    </View>
                    <View style={styles.mealInputContainerDetailed}>
                        <Text style={styles.label}>Kuro:</Text>
                        <input style={styles.input} type="number" name="kuro" value={kuroAmount} onChange={handleKuroChange}></input>
                        <Text style={styles.label}>Yuki:</Text>
                        <input style={styles.input} type="number" name="yuki" value={yukiAmount} onChange={handleYukiChange}></input>
                    </View>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.label}>Uhrzeit:</Text>
                    <input style={styles.input} type="time" name="timestamp" defaultValue={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}></input>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Mahlzeit speichern" onPress={() => onSave(meal)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mealInputContainer: {
        padding: 20,
        margin: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#71a5de'
    },
    mealInputContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    mealInputContainerGeneral: {
        flex: 1,
        marginRight: 20
    },
    mealInputContainerDetailed: {
        flex: 1
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 6,
        color: '#71a5de'
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 6,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: '#fafafa',
        width: '100%'
    },
    select: {
        height: 40,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 6,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: '#fafafa',
        width: '100%'
    },
    timeContainer: {
        marginTop: 10
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 10
    }
});
