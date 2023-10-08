import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  UserRegistration: undefined;
  HomePage: { userId: string; userEmail: string; presentation: string };  // Added this line
  TDEEScreen: undefined;
  FitnessGoalSelection: undefined;
  WorkoutSettings: undefined;
  DietaryPreferencesAllergies: undefined;
  HealthConcernsInjuries: undefined;
};

type HealthConcernsInjuriesNavigationProp = StackNavigationProp<RootStackParamList, 'HealthConcernsInjuries'>;

const HealthConcernsInjuries = ({ navigation }: { navigation: HealthConcernsInjuriesNavigationProp }) => {
  const [healthConcerns, setHealthConcerns] = useState<string>('');
  const [injuries, setInjuries] = useState<string>('');

  const userId = '';  // Placeholder, replace with actual value or fetch from appropriate source
  const userEmail = '';  // Placeholder, replace with actual value or fetch from appropriate source
  const presentation = '';  // Placeholder, replace with actual value or fetch from appropriate source

  const handleComplete = () => {
    // Logic to create the user's profile goes here
    // For now, we'll just show an alert and navigate to the HomePage
    Alert.alert('Profile Created', 'Your profile has been successfully created!', [
      { text: 'OK', onPress: () => navigation.navigate('HomePage', {
          userId: userId, 
          userEmail: userEmail, 
          presentation: presentation
        }) 
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Concerns & Injuries</Text>

      <Text style={styles.subTitle}>Health Concerns (if any):</Text>
      <TextInput 
        placeholder="E.g. Diabetes, Hypertension"
        value={healthConcerns}
        onChangeText={setHealthConcerns}
        style={styles.input}
      />

      <Text style={styles.subTitle}>Injuries (if any):</Text>
      <TextInput 
        placeholder="E.g. Knee injury, Back pain"
        value={injuries}
        onChangeText={setInjuries}
        style={styles.input}
      />

      <Button 
        title="COMPLETE" 
        onPress={handleComplete} 
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

export default HealthConcernsInjuries;
