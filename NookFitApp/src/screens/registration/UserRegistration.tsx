import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../reducers/userReducer';
import { StackNavigationProp } from '@react-navigation/stack';
import { registerUser } from '../../api/userAPI';

type RootStackParamList = {
  UserRegistration: undefined;
  TDEEScreen: undefined;
};

type UserRegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserRegistration'
>;

type Props = {
  navigation: UserRegistrationScreenNavigationProp;
};

const UserRegistration: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    presentation: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const response = await registerUser(formData);
      if (response.message) {
        Alert.alert('Registration Message', response.message);
      } else {
        dispatch(setUserProfile(formData));
        navigation.navigate('TDEEScreen');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Registration Error', error.message || 'Unable to register. Please check your connection and try again.');
      } else {
        Alert.alert('Registration Error', 'Unable to register. Please check your connection and try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Nook Fitness! Let's create your profile!</Text>

      <TextInput
        placeholder="Name"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry={true}
        style={styles.input}
      />

      <Text style={styles.subTitle}>How do you present?</Text>
      <Picker
        selectedValue={formData.presentation}
        onValueChange={(itemValue: string) =>
          setFormData({ ...formData, presentation: itemValue })
        }>
        <Picker.Item label="Masculine" value="masculine" />
        <Picker.Item label="Feminine" value="feminine" />
        <Picker.Item label="Non-Binary" value="non-binary" />
      </Picker>

      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10
  }
});

export default UserRegistration;
