import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: undefined;
  FitnessGoalSelection: undefined;
  WorkoutSettings: undefined;
  HomePage: undefined;
  DietaryPreferencesAllergies: undefined;
};

type FitnessGoalNavigationProp = StackNavigationProp<RootStackParamList, 'DietaryPreferencesAllergies'>;

const goals = [
  'Weight Loss',
  'Muscle Gain',
  'Improve Cardio',
  'Increase Strength',
  'Flexibility & Mobility',
  'General Fitness'
];

const FitnessGoalSelection = ({ navigation }: { navigation: FitnessGoalNavigationProp }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | undefined>(undefined);
  const [caloricAdjustment, setCaloricAdjustment] = useState<number>(0); // Default value

  const handleGoalChange = (goal: string) => {
    setSelectedGoal(goal);
    switch (goal) {
      case 'Weight Loss':
        setCaloricAdjustment(-500); // Default deficit for weight loss
        break;
      case 'Muscle Gain':
        setCaloricAdjustment(500); // Default surplus for muscle gain
        break;
      default:
        setCaloricAdjustment(0); // Maintenance
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Fitness Goal</Text>
      <Text style={styles.instruction}>Let's work on one goal at a time. You can always update this once you're ready to move on to the next goal.</Text>
      
      <Picker
        selectedValue={selectedGoal}
        onValueChange={(itemValue: string) => handleGoalChange(itemValue)}>
        {goals.map(goal => (
          <Picker.Item key={goal} label={goal} value={goal} />
        ))}
      </Picker>

      <Text style={styles.sliderLabel}>Adjust Caloric Intake:</Text>
      <Slider
        value={caloricAdjustment}
        onValueChange={value => setCaloricAdjustment(value)}
        minimumValue={-1000}
        maximumValue={1000}
        step={50}
      />
      <Text style={styles.sliderValue}>{caloricAdjustment > 0 ? `+${caloricAdjustment}` : caloricAdjustment} Calories</Text>

      <Button 
        title="NEXT" 
        onPress={() => navigation.navigate('DietaryPreferencesAllergies')} 
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('HomePage')} />
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
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  sliderValue: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default FitnessGoalSelection;
