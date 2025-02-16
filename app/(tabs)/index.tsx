import { View, Button, StyleSheet } from "react-native";
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
      <Button title="Reset" onPress={handleReset}></Button>
      <View style={styles.container}>

        <View>
          <BannerText totalAmount={totalAmount} />
          {showInput && <MealInput onSave={handleSave} />}

          {!showInput &&
            <View>
              <Button title="Mahlzeit hinzufügen" onPress={toggleInput}></Button>
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
    backgroundColor: "#FFFDD0"
  }
});
