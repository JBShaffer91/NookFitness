import React, { FunctionComponent, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import * as userAPI from '../../api/userAPI'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: { userEmail: string | null; presentation: string | null };
  FitnessGoalSelection: { 
    tdee: number; 
    userId: string; 
    userEmail: string; 
    presentation: string; 
    token: string; 
  };
  HomePage: undefined; 
};

type TDEENavigationProp = StackNavigationProp<RootStackParamList, 'TDEEScreen'>;
type TDEERouteProp = RouteProp<RootStackParamList, 'TDEEScreen'>; 

type TDEEScreenProps = {
  navigation: TDEENavigationProp;
  route: TDEERouteProp;
};

const TDEEScreen: React.FC<Partial<TDEEScreenProps>> = ({ navigation, route }) => {
  if (!navigation || !route) {
    return null;
  }
  
  const [formData, setFormData] = useState({
    age: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    activityLevel: '',
    username: '',
});

  const userEmail = route.params?.userEmail;
  const presentation = route.params?.presentation;
  const token = useSelector((state: RootState) => state.user.token);
  

  if (!presentation) {
    console.error("Presentation is not available.");
    return null; 
  }  
  
  const calculateTDEE = (presentation: 'masculine' | 'feminine' | 'non-binary') => {
    let BMR = 0;
    const weightInKg = parseInt(formData.weight) * 0.453592; // Convert lbs to kg
    const heightInCm = ((parseInt(formData.heightFeet) * 12) + parseInt(formData.heightInches)) * 2.54; // Convert feet and inches to cm

    switch (presentation) {
      case 'masculine':
        BMR = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseInt(formData.age)) + 5;
        break;
      case 'feminine':
        BMR = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseInt(formData.age)) - 161;
        break;
      case 'non-binary':
        // Average of masculine and feminine
        const masculineBMR = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseInt(formData.age)) + 5;
        const feminineBMR = (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseInt(formData.age)) - 161;
        BMR = (masculineBMR + feminineBMR) / 2;
        break;
    }

    let multiplier = 1.2;
    switch (formData.activityLevel) {
      case 'light':
        multiplier = 1.375;
        break;
      case 'moderate':
        multiplier = 1.55;
        break;
      case 'intense':
        multiplier = 1.725;
        break;
    }
    return BMR * multiplier;
  };

  const handleSubmit = async () => {
    if (!presentation) {
      console.error("Presentation is not available.");
      return;
    }
  
    if (!['masculine', 'feminine', 'non-binary'].includes(presentation)) {
      console.error("Invalid presentation value:", presentation);
      return;
    }
  
    const tdee = calculateTDEE(presentation as 'masculine' | 'feminine' | 'non-binary');
  
    if (!userEmail) {
      console.error("User email is not available.");
      return;
    }
  
    if (!token) {
      console.error("Token is not available.");
      return;
    }
  
    try {
      await userAPI.updateUserTDEE(userEmail, {
        tdee,
        age: formData.age,
        height: (parseInt(formData.heightFeet) * 12) + parseInt(formData.heightInches),
        weight: formData.weight,
        username: formData.username,
      }, token);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid Token") {
          navigation.navigate('UserRegistration');
          console.error("Token has expired. Redirecting to login.");
        } else {
          console.error("Failed to update TDEE in backend:", error.message);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  
    navigation.navigate('FitnessGoalSelection', {
      tdee: tdee,
      userId: userEmail,
      userEmail: userEmail,
      presentation: presentation,
      token: token 
    });
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
