import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../reducers/userReducer';
import { StackNavigationProp } from '@react-navigation/stack';
import { registerUser } from '../../api/userAPI';
import { BACKEND_URL, API_KEY_SUGGESTIC } from '@env';
console.log(BACKEND_URL, API_KEY_SUGGESTIC);
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

type RootStackParamList = {
  UserRegistration: undefined;
  HomePage: undefined;
};

type UserRegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserRegistration'
>;

type Props = {
  navigation: UserRegistrationScreenNavigationProp;
};

type UserData = {
  username?: string;
  email: string;
  password: string;
  presentation?: string;
};

const CREATE_USER_IN_SUGGESTIC = gql`
  mutation CreateUser($email: String!, $name: String!) {
    createUser(email: $email, name: $name) {
      id
      email
      name
    }
  }
`;

const UserRegistration: React.FC<Props> = ({ navigation }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    username: '',
    email: '',
    password: '',
    presentation: '',
  });

  const dispatch = useDispatch();

  const [createUser] = useMutation(CREATE_USER_IN_SUGGESTIC, {
    context: {
      headers: {
        'Authorization': `token ${API_KEY_SUGGESTIC}`
      }
    }
  });

  const createUserInSuggestic = async (data: UserData) => {
    try {
      const response = await createUser({
        variables: {
          email: data.email,
          name: data.username
        }
      });
      return response.data; // Adjust based on the actual response structure
    } catch (error) {
      console.error("Error creating user in Suggestic:", error);
      throw error;
    }
  };

  const signInUser = async (data: UserData) => {
    console.log("Attempting to sign in with data:", data);

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to sign in.');
      }

      return responseData;
    } catch (error) {
      console.error("SignIn Error:", error);
      throw error;
    }
  };

  const handleSignIn = async () => {
    try {
      const signInResponse = await signInUser(formData);
      if (signInResponse.token) {
        dispatch(setUserProfile(formData));
        navigation.navigate('HomePage');
      } else {
        Alert.alert('Sign In Message', signInResponse.message || 'Unknown error occurred.');
      }
    } catch (error: any) {
      console.error("Error:", error.message || "An unknown error occurred");
      Alert.alert('Error', 'Unable to process. Please check your connection and try again.');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(formData);
      
      if (response.message === 'User already exists.') {
        handleSignIn();
      } else if (response.message) {
        Alert.alert('Registration Message', response.message);
      } else {
        await createUserInSuggestic(formData); // Create user in Suggestic
        dispatch(setUserProfile(formData));
        navigation.navigate('HomePage');
      }
    } catch (error: any) {
      console.error("Error:", error.message || "An unknown error occurred");
      Alert.alert('Error', 'Unable to process. Please check your connection and try again.');
    }
  };

  return (
    <View style={styles.container}>
      {isSignIn ? (
        <>
          <Text style={styles.title}>Welcome back to Nook Fitness! Sign In to continue.</Text>
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
          <Button title="Sign In" onPress={handleSignIn} />
          <Text style={{ textAlign: 'center', marginTop: 10 }} onPress={() => setIsSignIn(false)}>New here? Register</Text>
        </>
      ) : (
        <>
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
          <Text style={{ textAlign: 'center', marginTop: 10 }} onPress={() => setIsSignIn(true)}>Already a user? Sign In</Text>
        </>
      )}
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
