import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: undefined;
  FitnessGoalSelection: undefined;
  WorkoutSettings: undefined;
  DietaryPreferencesAllergies: undefined;
  HealthConcernsInjuries: undefined;
};

type DietaryPreferencesAllergiesNavigationProp = StackNavigationProp<RootStackParamList, 'DietaryPreferencesAllergies'>;

const SEND_DIETARY_PREFERENCES = gql`
  mutation SendDietaryPreferences($diet: String!, $allergies: String!) {
    sendDietaryPreferences(diet: $diet, allergies: $allergies) {
      id
      diet
      allergies
    }
  }
`;

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
  const [selectedDiet, setSelectedDiet] = useState<string>('');
  const [allergies, setAllergies] = useState<string>('');
  const [sendDietaryPreferences] = useMutation(SEND_DIETARY_PREFERENCES);

  const handleNext = async () => {
    try {
      const response = await sendDietaryPreferences({
        variables: {
          diet: selectedDiet,
          allergies: allergies,
        },
      });

      if (response.data) {
        navigation.navigate('HealthConcernsInjuries');
      }
    } catch (error) {
      console.error('Error sending dietary preferences:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dietary Preferences & Allergies</Text>

      <Text style={styles.subTitle}>Dietary Preference:</Text>
      <Picker
        selectedValue={selectedDiet}
        onValueChange={(itemValue: string) => setSelectedDiet(itemValue)}
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
