import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nook Fitness Dashboard</Text>

      {/* Available Calories and Macronutrients */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Available Calories and Macronutrients</Text>
        {/* Display the available calories and macronutrients here */}
      </View>

      {/* Tasks on the User's To-Do List */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Today's To-Do List</Text>
        {/* Display the tasks on the user's to-do list here */}
      </View>

      {/* Water Intake */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Water Intake</Text>
        {/* Display the water bottle icons here for users to log their intake */}
      </View>

      {/* Daily Food Diary Prompts */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Food Diary</Text>
        {/* Display prompts for users to log their meals and snacks */}
      </View>

      {/* Navigation to Other Profile Features */}
      <Button title="Update TDEE Information" onPress={() => {/* Navigate to TDEEScreen */}} />
      <Button title="Update Dietary Preferences" onPress={() => {/* Navigate to DietaryPreferencesAllergies screen */}} />
      <Button title="Update Workout Settings" onPress={() => {/* Navigate to WorkoutSettings screen */}} />
      {/* Add more navigation buttons as needed */}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  section: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default HomePage;
