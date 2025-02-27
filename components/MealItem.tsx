import { Meal } from "@/types/meal";
import { View, Text, StyleSheet } from "react-native";

export default function MealItem({ meal }: { meal: Meal }) {
    const dayTime = {
        morning: "🌅",
        afternoon: "☀️",
        evening: "🌙"
    }

    const timeOfDay = meal.timestamp >= "18:00" || meal.timestamp < "05:00" ? dayTime.evening : meal.timestamp >= "11:00" ? dayTime.afternoon : dayTime.morning;

    return (
        <View style={styles.mealItemContainer}>
            <Text style={styles.mealItemContainerTitle}>{timeOfDay} Uhrzeit: {meal.timestamp}</Text>
            <View style={styles.mealItemContainerRow}>
                <View style={styles.mealItemContainerGeneral}>
                    <Text style={styles.text}>Art: {meal.type}</Text>
                    <Text style={styles.text}>Menge: {meal.amount}</Text>
                </View>
                <View style={styles.mealItemContainerDetailed}>
                    <Text style={styles.text}>Kuro: {meal.kuroAmount}</Text>
                    <Text style={styles.text}>Yuki: {meal.yukiAmount}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItemContainer: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderColor: "#71a5de",
        borderWidth: 2,
        backgroundColor: "#f8f9fb"
    },
    mealItemContainerTitle: {
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "#71a5de"
    },
    mealItemContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mealItemContainerGeneral: {
        alignSelf: "flex-start"
    },
    mealItemContainerDetailed: {
        alignSelf: "flex-end",
    },
    text: {
        color: "#83b0e1",
        fontWeight: "bold"
    }
});