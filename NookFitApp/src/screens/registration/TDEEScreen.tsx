import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setMaintenanceCalories } from '../../reducers/userReducer';
import { useSelector } from 'react-redux';

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: undefined;
  FitnessGoalSelection: undefined;
  HomePage: undefined; 
};

type TDEENavigationProp = StackNavigationProp<RootStackParamList, 'TDEEScreen'>;

type ReduxState = {
  user: {
    presentation: 'masculine' | 'feminine' | 'non-binary';
  };
};

const TDEEScreen = ({ navigation }: { navigation: TDEENavigationProp }) => {
  const [formData, setFormData] = useState({
    age: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    activityLevel: '',
  });

  const presentation = useSelector((state: ReduxState) => state.user.presentation);

  const dispatch = useDispatch();
  
  const calculateTDEE = (presentation: 'masculine' | 'feminine' | 'non-binary') => {
    let BMR = 0;
    switch (presentation) {
      case 'masculine':
        BMR = 66.5 + ( 13.75 * parseInt(formData.weight) ) + ( 5.003 * (parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches)) ) - ( 6.75 * parseInt(formData.age) );
        break;
      case 'feminine':
        BMR = 655.1 + ( 9.563 * parseInt(formData.weight) ) + ( 1.850 * (parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches)) ) - ( 4.676 * parseInt(formData.age) );
        break;
      case 'non-binary':
        // Average of masculine and feminine
        const masculineBMR = 66.5 + ( 13.75 * parseInt(formData.weight) ) + ( 5.003 * (parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches)) ) - ( 6.75 * parseInt(formData.age) );
        const feminineBMR = 655.1 + ( 9.563 * parseInt(formData.weight) ) + ( 1.850 * (parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches)) ) - ( 4.676 * parseInt(formData.age) );
        BMR = (masculineBMR + feminineBMR) / 2;
        break;
    }

    let multiplier = 1.2; // Default for sedentary
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

  const handleSubmit = () => {
  const tdee = calculateTDEE(presentation);
  dispatch(setMaintenanceCalories(tdee)); 
  navigation.navigate('FitnessGoalSelection');
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
