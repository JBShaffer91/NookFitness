import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  HomePage: { userId: string };
  TDEEScreen: { userId: string };
  DietaryPreferencesAllergies: { userId: string };
  WorkoutSettings: { userId: string };
  FitnessGoalSelection: { userId: string };
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const HomePage: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'HomePage'>>();
  // Access user data from the Redux store
  const { maintenanceCalories, caloricTarget, macronutrients } = useSelector((state: RootState) => state.user);

  const userId = route.params?.userId;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nook Fitness Dashboard</Text>

      {/* Available Calories and Macronutrients */}
      <View style={styles.card}>
        {maintenanceCalories !== null && <Text>Maintenance Calories: {maintenanceCalories} kcal</Text>}
        {caloricTarget !== null && <Text>Caloric Adjustment: {caloricTarget} kcal</Text>}
        {maintenanceCalories !== null && caloricTarget !== null && (
        <Text>Total Available Calories for the Day: {maintenanceCalories + caloricTarget} kcal</Text>
        )}
        {macronutrients !== null && <Text>Macronutrients: {JSON.stringify(macronutrients)}</Text>}
      </View>

      {/* Tasks on the User's To-Do List */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 Today's To-Do List</Text>
        {/* Display the tasks on the user's to-do list here */}
      </View>

      {/* Water Intake */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💧 Water Intake</Text>
        {/* Display the water bottle icons here for users to log their intake */}
      </View>

      {/* Daily Food Diary Prompts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍽️ Food Diary</Text>
        {/* Display prompts for users to log their meals and snacks */}
      </View>

      {/* Navigation to Other Profile Features */}
      <Button title="Update TDEE Information" onPress={() => navigation.navigate('TDEEScreen', { userId })} />
      <Button title="Update Fitness Goals" onPress={() => navigation.navigate('FitnessGoalSelection', { userId })} />
      <Button title="Update Dietary Preferences" onPress={() => navigation.navigate('DietaryPreferencesAllergies', { userId })} />
      <Button title="Update Workout Settings" onPress={() => navigation.navigate('WorkoutSettings', { userId })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomePage;
