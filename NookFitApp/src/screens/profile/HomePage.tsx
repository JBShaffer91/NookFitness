import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  HomePage: undefined;
  TDEEScreen: undefined;
  DietaryPreferencesAllergies: undefined;
  WorkoutSettings: undefined;
  FitnessGoalSelection: undefined;
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const HomePage: React.FC<{ navigation: HomeNavigationProp }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nook Fitness Dashboard</Text>

      {/* Available Calories and Macronutrients */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍎 Available Calories and Macronutrients</Text>
        {/* Display the available calories and macronutrients here */}
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
      <Button title="Update TDEE Information" onPress={() => navigation.navigate('TDEEScreen')} />
      <Button title="Update Dietary Preferences" onPress={() => navigation.navigate('DietaryPreferencesAllergies')} />
      <Button title="Update Workout Settings" onPress={() => navigation.navigate('WorkoutSettings')} />
      <Button title="Update Fitness Goals" onPress={() => navigation.navigate('FitnessGoalSelection')} />
      {/* Add more navigation buttons as needed */}
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
