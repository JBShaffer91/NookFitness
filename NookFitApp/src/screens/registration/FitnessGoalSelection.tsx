import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCaloricTarget } from '../../reducers/userReducer';
import { updateUserFitnessGoals } from '../../api/userAPI';

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: undefined;
  FitnessGoalSelection: { 
    userId: string; 
    tdee: number; 
    token: string | null; 
    refreshToken: string | null;
    userEmail: string; 
    presentation: string; 
  };
  WorkoutSettings: undefined;
  HomePage: {
    userId?: string;
    userEmail?: string;
    presentation?: string;
    caloricTarget?: number
  };
  DietaryPreferencesAllergies: {
    userId: string;
    userEmail: string;
    presentation: string;
    tdee: number;
    token: string | null;
  };
};

type FitnessGoalNavigationProp = StackNavigationProp<RootStackParamList, 'FitnessGoalSelection'>;

const goals = [
  '--Select your goal--',
  'Weight Loss',
  'Muscle Gain',
  'Improve Cardio',
  'Increase Strength',
  'Flexibility & Mobility',
  'General Fitness'
];

const FitnessGoalSelection = ({ navigation }: { navigation: FitnessGoalNavigationProp }) => {
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'FitnessGoalSelection'>>();
  const { tdee, userId, userEmail, presentation, refreshToken } = route.params;

  const [selectedGoal, setSelectedGoal] = useState<string | undefined>(undefined);
  const [caloricAdjustment, setCaloricAdjustment] = useState<number>(0);
  const [sliderKey, setSliderKey] = useState<number>(0);

  const handleGoalChange = async (goal: string) => {
    setSelectedGoal(goal);
    let adjustment = 0;
    switch (goal) {
      case 'Weight Loss':
        adjustment = -250;
        break;
      case 'Muscle Gain':
        adjustment = 500;
        break;
      case 'Improve Cardio':
        adjustment = 300;
        break;
      case 'Increase Strength':
        adjustment = 500;
        break;
      case 'Flexibility & Mobility':
      case 'General Fitness':
        adjustment = 0;
        break;
      default:
        adjustment = 0;
        break;
    }
    setCaloricAdjustment(adjustment);
    dispatch(setCaloricTarget(tdee + adjustment));
    setSliderKey(prevKey => prevKey + 1);

    if (userEmail && route.params.token) {
      try {
        const fitnessGoalsData = {
          fitnessGoals: {
          goal: goal,
          caloricAdjustment: adjustment
        },
        caloricTarget: tdee + adjustment,
        refreshToken: refreshToken
      };
      await updateUserFitnessGoals(userEmail, fitnessGoalsData, route.params.token);
      } catch (error) {
        console.error('Failed to update fitness goals:', error);
      }
    } else {
      console.error('User email or token is missing.');
    }
      console.log('Attempting to update fitness goals for user:', userEmail);
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
        key={sliderKey}
        value={caloricAdjustment}
        onValueChange={value => setCaloricAdjustment(value)}
        minimumValue={-1000}
        maximumValue={1000}
        step={50}
      />
      <Text style={styles.sliderValue}>{caloricAdjustment > 0 ? `+${caloricAdjustment}` : caloricAdjustment} Calories</Text>

      <Button 
        title="NEXT" 
        onPress={() => {
          navigation.navigate('DietaryPreferencesAllergies', {
            userId: userId,
            userEmail: userEmail,
            presentation: presentation,
            tdee: tdee + caloricAdjustment,
            token: route.params.token
          });
        }} 
      />
      <Button 
        title="Go to Home" 
        onPress={() => {
          if (!selectedGoal || selectedGoal === '--Select your goal--') {
            Alert.alert('Error', 'Please select a fitness goal.');
            return;
          }
          dispatch(setCaloricTarget(tdee + caloricAdjustment));
          navigation.navigate('HomePage', { 
            userId: userId, 
            userEmail: userEmail, 
            presentation: presentation, 
            caloricTarget: tdee + caloricAdjustment 
          });
        }} 
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
