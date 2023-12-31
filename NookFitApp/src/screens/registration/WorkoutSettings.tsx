import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  UserRegistration: undefined;
  HomePage: { userId: string; userEmail: string; presentation: string };
  TDEEScreen: undefined;
  FitnessGoalSelection: undefined;
  WorkoutSettings: undefined;
  DietaryPreferencesAllergies: undefined;
};

type WorkoutSettingsNavigationProp = StackNavigationProp<RootStackParamList, 'WorkoutSettings'>;

const workoutTypes = [
  'Gym Workouts',
  'Home Workouts with Weights',
  'Home Workouts without Weights',
  'Outdoor Activities (e.g. Running, Cycling)',
  'Group Classes (e.g. Yoga, Zumba)',
];

const WorkoutSettings = ({ navigation }: { navigation: WorkoutSettingsNavigationProp }) => {
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [presentation, setPresentation] = useState<string>('');

  const [frequency, setFrequency] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const defaultPreferences = workoutTypes.reduce((acc, type) => {
    acc[type] = 'sometimes'; // default value
    return acc;
  }, {} as Record<string, string>);

  const [preferences, setPreferences] = useState<Record<string, string>>(defaultPreferences);

  const setPreference = (type: string, value: string) => {
    setPreferences(prev => ({ ...prev, [type]: value }));
  };

  const handleNextPress = () => {
    if (!frequency || !duration || !Object.values(preferences).every(pref => pref)) {
      Alert.alert('Incomplete Selection', 'Please make sure you have selected all preferences before proceeding.');
      return;
    }
    navigation.navigate('HomePage', {
      userId: userId, 
      userEmail: userEmail, 
      presentation: presentation
    });
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ justifyContent: 'center', paddingBottom: 50 }}
    >
      <Text style={styles.title}>Workout Frequency & Duration</Text>

      <Text style={styles.subTitle}>How often do you work out in a week?</Text>
      <Picker
        selectedValue={frequency}
        onValueChange={(itemValue: string) => setFrequency(itemValue)}
      >
        <Picker.Item label="1-2 times" value="1-2" />
        <Picker.Item label="3-4 times" value="3-4" />
        <Picker.Item label="5-6 times" value="5-6" />
        <Picker.Item label="Everyday" value="7" />
      </Picker>

      <Text style={styles.subTitle}>Average duration of your workouts?</Text>
      <Picker
        selectedValue={duration}
        onValueChange={(itemValue: string) => setDuration(itemValue)}
      >
        <Picker.Item label="Less than 30 minutes" value="<30" />
        <Picker.Item label="30 minutes to 1 hour" value="30-60" />
        <Picker.Item label="1-2 hours" value="1-2" />
        <Picker.Item label="More than 2 hours" value=">2" />
      </Picker>

      <Text style={styles.title}>Preferred Workout Type</Text>
      {workoutTypes.map(type => (
        <View key={type} style={styles.pickerContainer}>
          <Text style={styles.subTitle}>{type}</Text>
          <Picker
            selectedValue={preferences[type]}
            onValueChange={(itemValue: string) => setPreference(type, itemValue)}
          >
            <Picker.Item label="Sometimes" value="sometimes" />
            <Picker.Item label="Always" value="always" />
            <Picker.Item label="Never" value="never" />
          </Picker>
        </View>
      ))}

      <Button 
        title="NEXT" 
        onPress={handleNextPress}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  pickerContainer: {
    marginBottom: 30,
  },
});

export default WorkoutSettings;
