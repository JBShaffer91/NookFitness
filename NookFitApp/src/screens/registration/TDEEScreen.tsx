import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@apollo/client'; // Import Apollo Client hook
import gql from 'graphql-tag'; // Import GraphQL tag

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: undefined;
  FitnessGoalSelection: undefined;
  HomePage: undefined; 
};

type TDEENavigationProp = StackNavigationProp<RootStackParamList, 'TDEEScreen'>;
type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

// Define your GraphQL mutation (replace with your actual mutation)
const SEND_TDEE_DATA = gql`
  mutation SendTDEEData($age: Int!, $heightFeet: Int!, $heightInches: Int!, $weight: Int!, $activityLevel: String!) {
    createTDEEData(age: $age, heightFeet: $heightFeet, heightInches: $heightInches, weight: $weight, activityLevel: $activityLevel) {
      id
      age
      heightFeet
      heightInches
      weight
      activityLevel
    }
  }
`;

const TDEEScreen = ({ navigation }: { navigation: TDEENavigationProp }) => {
  const [formData, setFormData] = useState({
    age: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    activityLevel: '',
  });

  // Use Apollo Client's useMutation hook
  const [sendTDEEData] = useMutation(SEND_TDEE_DATA);

  const handleSubmit = async () => {
    try {
      // Send data to the Suggestic API
      const response = await sendTDEEData({
        variables: {
          age: parseInt(formData.age),
          heightFeet: parseInt(formData.heightFeet),
          heightInches: parseInt(formData.heightInches),
          weight: parseInt(formData.weight),
          activityLevel: formData.activityLevel,
        },
      });

      // Handle the response or errors
      if (response.data) {
        // Navigate to the next screen or handle the response as needed
        navigation.navigate('FitnessGoalSelection');
      }
    } catch (error) {
      console.error('Error sending TDEE data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TDEE Information</Text>
      <Text style={styles.description}>
        TDEE (Total Daily Energy Expenditure) represents the total number of calories you burn in a day. It's essential for understanding how much food you should eat to maintain, lose, or gain weight.
      </Text>

      <TextInput
        placeholder="Age"
        value={formData.age}
        onChangeText={(text) => setFormData({ ...formData, age: text })}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Height (feet)"
        value={formData.heightFeet}
        onChangeText={(text) => setFormData({ ...formData, heightFeet: text })}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Height (inches)"
        value={formData.heightInches}
        onChangeText={(text) => setFormData({ ...formData, heightInches: text })}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Weight (in lbs)"
        value={formData.weight}
        onChangeText={(text) => setFormData({ ...formData, weight: text })}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.subTitle}>Activity Level:</Text>
      <Picker
        selectedValue={formData.activityLevel}
        onValueChange={(itemValue: string) =>
          setFormData({ ...formData, activityLevel: itemValue })
        }>
        <Picker.Item label="Sedentary (little to no exercise)" value="sedentary" />
        <Picker.Item label="Light Activity (light exercise/sports 1-3 days/week)" value="light" />
        <Picker.Item label="Moderate Activity (moderate exercise/sports 3-5 days/week)" value="moderate" />
        <Picker.Item label="Intense Activity (hard exercise/sports 6-7 days a week)" value="intense" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />
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
  description: {
    fontSize: 16,
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
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default TDEEScreen;
