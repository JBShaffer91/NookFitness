import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: undefined;
  FitnessGoalSelection: undefined;
  WorkoutSettings: undefined;
};

type FitnessGoalNavigationProp = StackNavigationProp<RootStackParamList, 'FitnessGoalSelection'>;

const goals = [
  'Weight Loss',
  'Muscle Gain',
  'Improve Cardio',
  'Increase Strength',
  'Flexibility & Mobility',
  'General Fitness'
];

const FitnessGoalSelection = ({ navigation }: { navigation: FitnessGoalNavigationProp }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(prevGoals => prevGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals(prevGoals => [...prevGoals, goal]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Fitness Goals</Text>
      {goals.map(goal => (
        <TouchableOpacity
          key={goal}
          style={styles.goalItem}
          onPress={() => toggleGoal(goal)}
        >
          <Text style={styles.goalText}>{goal}</Text>
          {selectedGoals.includes(goal) && <Text style={styles.checkmark}>✔</Text>}
        </TouchableOpacity>
      ))}
      <Button 
        title="NEXT" 
        onPress={() => navigation.navigate('WorkoutSettings')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  goalText: {
    fontSize: 18,
  },
  checkmark: {
    fontSize: 18,
    color: 'green',
  },
});

export default FitnessGoalSelection;
