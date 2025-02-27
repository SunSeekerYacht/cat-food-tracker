import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import BannerText from "@/components/banner";
import MealInput from "@/components/MealInput";
import MealItem from "@/components/MealItem";
import { useInput } from "@/hooks/useInput";
import { useMeals } from "@/hooks/useMeals";
import { Meal } from "@/types/meal";
export default function Index() {
  const { showInput, toggleInput } = useInput();
  const { meals, totalAmount, handleAddMeal, handleReset } = useMeals();

  const handleSave = (meal: Meal) => {
    handleAddMeal(meal);
    toggleInput();
  };

  return (
    <View>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.text}>Neuer Tag</Text>
      </TouchableOpacity>
      <View style={styles.container}>

        <View>
          <BannerText totalAmount={totalAmount} />
          {showInput && <MealInput onSave={handleSave} />}

          {!showInput &&
            <View>
              <TouchableOpacity style={styles.addButton} onPress={toggleInput}>
                <Text style={styles.text}>Mahlzeit hinzufügen</Text>
              </TouchableOpacity>
            </View>
          }
        </View>

        {meals.slice().reverse().map((meal) => (
          <MealItem meal={meal} />
        ))}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e1ecf7"
  },
  resetButton: {
    backgroundColor: "#71a5de",
    padding: 10,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#71a5de",
    padding: 10,
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    color: "#f8f9fb",
    fontWeight: "bold"
  }
});
