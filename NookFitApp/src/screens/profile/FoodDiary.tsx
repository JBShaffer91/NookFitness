import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type FoodDiaryProps = {
  // Add any props if needed
};

const FoodDiary: React.FC<FoodDiaryProps> = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [caloricIntake, setCaloricIntake] = useState<number>(0);
  const [availableCalories, setAvailableCalories] = useState<number>(0);
  const [macronutrients, setMacronutrients] = useState<{ carbs: number, protein: number, fat: number }>({ carbs: 0, protein: 0, fat: 0 });
  const [mealPlan, setMealPlan] = useState<any[]>([]);

  useEffect(() => {
    // Check if the user has completed the registration
    // This can be done by checking a value in your app's state or local storage
    // For now, we'll use a dummy value
    const userCompletedRegistration = true; // This should be replaced with actual logic

    setIsRegistered(userCompletedRegistration);

    if (userCompletedRegistration) {
      // Fetch user's caloric intake and meal plan from Suggestic API
      // For now, we'll use dummy data
      const dummyCaloricIntake = 2000;
      const dummyAvailableCalories = 1500;
      const dummyMacronutrients = { carbs: 50, protein: 30, fat: 20 };
      const dummyMealPlan = [
        { id: 1, name: 'Breakfast', items: ['Oatmeal', 'Banana'] },
        // ... add more dummy meals
      ];
      setCaloricIntake(dummyCaloricIntake);
      setAvailableCalories(dummyAvailableCalories);
      setMacronutrients(dummyMacronutrients);
      setMealPlan(dummyMealPlan);
    }
  }, []);

  return (
    <View style={styles.container}>
      {!isRegistered ? (
        <View>
          <Text>Please complete the registration screens to view your food diary.</Text>
          {/* Add a button to navigate to the registration screen if needed */}
          <Button title="Go to Registration" onPress={() => { /* Navigate to registration */ }} />
        </View>
      ) : (
        <View>
          <Text>Total Caloric Intake for the Day: {caloricIntake} kcal</Text>
          <Text>Available Calories: {availableCalories} kcal</Text>
          <Text>Macronutrients - Carbs: {macronutrients.carbs}g, Protein: {macronutrients.protein}g, Fat: {macronutrients.fat}g</Text>
          <Text>Meal Plan for the Day:</Text>
          {mealPlan.map(meal => (
            <View key={meal.id}>
              <Text>{meal.name}: {meal.items.join(', ')}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FoodDiary;
