import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import { setMacronutrients } from '../../reducers/userReducer';

type RootStackParamList = {
  UserRegistration: undefined;
  HomePage: { 
    userId?: string; 
    userEmail?: string; 
    presentation?: string; 
  };
  TDEEScreen: undefined;
  FitnessGoalSelection: undefined;
  WorkoutSettings: undefined;
  DietaryPreferencesAllergies: { 
    userId: string; 
    userEmail: string; 
    presentation: string; 
    token: string | null; 
  };
  HealthConcernsInjuries: undefined;
};

type DietaryPreferencesAllergiesNavigationProp = StackNavigationProp<RootStackParamList, 'DietaryPreferencesAllergies'>;

type ReduxState = {
  user: {
    caloricTarget: number;
  };
};

const dietaryPreferences = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Keto',
  'Paleo',
  'Gluten-Free',
  'Dairy-Free',
  'No Specific Diet'
];

const DietaryPreferencesAllergies = ({ navigation }: { navigation: DietaryPreferencesAllergiesNavigationProp }) => {
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'DietaryPreferencesAllergies'>>();
  const caloricTarget = useSelector((state: ReduxState) => state.user.caloricTarget);
  const { userId, userEmail, presentation } = route.params;

  const [selectedDiet, setSelectedDiet] = useState<string>('');
  const [allergies, setAllergies] = useState<string>('');

  const handleDietChange = (diet: string) => {
    setSelectedDiet(diet);
    let macros = { carbs: 0, protein: 0, fat: 0 };
    switch (diet) {
      case 'Vegetarian':
        macros = { carbs: 0.55, protein: 0.25, fat: 0.20 };
        break;
      case 'Vegan':
        macros = { carbs: 0.60, protein: 0.20, fat: 0.20 };
        break;
      case 'Pescatarian':
        macros = { carbs: 0.50, protein: 0.30, fat: 0.20 };
        break;
      case 'Keto':
        macros = { carbs: 0.05, protein: 0.20, fat: 0.75 };
        break;
      case 'Paleo':
        macros = { carbs: 0.40, protein: 0.30, fat: 0.30 };
        break;
      case 'Gluten-Free':
      case 'Dairy-Free':
      case 'No Specific Diet':
        macros = { carbs: 0.50, protein: 0.25, fat: 0.25 };
        break;
    }
    const calculatedMacros = {
      carbs: Math.round(macros.carbs * caloricTarget / 4),
      protein: Math.round(macros.protein * caloricTarget / 4),
      fat: Math.round(macros.fat * caloricTarget / 9),
    };
    dispatch(setMacronutrients(calculatedMacros));
  };

  const handleSubmit = () => {
    if (selectedDiet) {
      handleDietChange(selectedDiet);
    }
  };

  const handleNext = () => {
    handleSubmit();
    navigation.navigate('WorkoutSettings');
  };

  const handleGoToHome = () => {
    handleSubmit();
    navigation.navigate('HomePage', {
      userId: userId, 
      userEmail: userEmail, 
      presentation: presentation
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dietary Preferences & Allergies</Text>
      <Text style={styles.subTitle}>Dietary Preference:</Text>
      <Picker
        selectedValue={selectedDiet}
        onValueChange={(itemValue: string) => handleDietChange(itemValue)}
      >
        {dietaryPreferences.map(diet => (
          <Picker.Item key={diet} label={diet} value={diet} />
        ))}
      </Picker>
      <Text style={styles.subTitle}>Food Allergies (if any):</Text>
      <TextInput 
        placeholder="E.g. Peanuts, Shellfish, Dairy"
        value={allergies}
        onChangeText={setAllergies}
        style={styles.input}
      />
      <Button 
        title="NEXT" 
        onPress={handleNext} 
      />
      <Button 
        title="Go to Home" 
        onPress={handleGoToHome} 
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
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default DietaryPreferencesAllergies;
