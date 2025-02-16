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
                    <Text>Art: {meal.type}</Text>
                    <Text>Menge: {meal.amount}</Text>
                </View>
                <View style={styles.mealItemContainerDetailed}>
                    <Text>Kuro: {meal.kuroAmount}</Text>
                    <Text>Yuki: {meal.yukiAmount}</Text>
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
        borderBlockColor: "black",
        borderWidth: 1,
        backgroundColor: "#FFFDD0"
    },
    mealItemContainerTitle: {
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "bold"
    },
    mealItemContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mealItemContainerGeneral: {
        alignSelf: "flex-start"
    },
    mealItemContainerDetailed: {
        alignSelf: "flex-end"
    }
});