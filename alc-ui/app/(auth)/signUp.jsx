import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';
import api from '../../lib/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GENERAL } from '../../constants/constants';

export default function SignUpScreen() {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [errors, setErrors] = useState({});
   const { register } = useContext(AuthContext);
   const router = useRouter();

const validate = () => {
   const newErrors = {};
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;


   if (!firstName.trim()) newErrors.firstName = 'First name is required';
   if (!lastName.trim()) newErrors.lastName = 'Last name is required';
   if (!email.trim()) newErrors.email = 'Email is required';
   else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format';

   if (!password) newErrors.password = 'Password is required';
   else if (!passwordRegex.test(password)) newErrors.password = 'Password must contain at least 8 characters, including one uppercase letter, one number, and one special character (e.g. !@#$)';

   if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password';
   else if (confirmPassword != password) newErrors.confirmPassword = 'Passwords do not match';

   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
};

const capitalizeWords = (str) => {
   return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

const handleSignup = async () => {
   if (!validate()) return; 
   
   try {
    const fullName = `${capitalizeWords(firstName.trim())} ${capitalizeWords(lastName.trim())}`;
    const firebaseUser = await register(email.trim(), password, fullName);
    // console.log('Firebase User created:', firebaseUser);

    const userData = {
      firebaseUid: firebaseUser.uid,
      email: email.trim(),
      firstName: capitalizeWords(firstName.trim()),
      lastName: capitalizeWords(lastName.trim()),
    }
    
    const mongoResponse = await api.post('/users', userData);
    // console.log('User created in MongoDB:', mongoResponse.data);
   } catch (error) {
    const newErrors = {};

    if (error.response) {
      console.error('API error status:', error.response.status);
      console.error('API error data:', error.response.data);
    }

    // Firebase error handling
    if (error.code === 'auth/email-already-in-use') {
      newErrors.firebase = 'This email is already in use';
    } else if (error.code === 'auth/invalid-email') {
      newErrors.firebase = 'Invalid email address';
    } else if (error.code === 'auth/weak-password') {
      newErrors.firebase = 'Password is too weak. Please use a password that has at least 8 characters with one uppercase letter and a special character.';
    } else if (error.code === 'auth/network-request-failed') {
      newErrors.firebase = 'Network error. Please check your connection.';
    } else {
      newErrors.firebase = 'Something went wrong. Please try again.';
    }
    
    setErrors(newErrors);
   }
};

return (
   <ScrollView
     contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
     keyboardShouldPersistTaps="handled"
   >

   <View style={styles.container}>
     <View style={styles.card}>
       <Text style={styles.title}>Sign up</Text>

       <TextInput
         style={styles.input}
         placeholder="First Name"
         value={firstName}
         onChangeText={setFirstName}
         autoCapitalize='words'
       />
       {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

       <TextInput
         style={styles.input}
         placeholder="Last Name"
         value={lastName}
         onChangeText={setLastName}
       />
       {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

       <TextInput
         style={styles.input}
         placeholder="Email"
         value={email}
         onChangeText={setEmail}
         autoCapitalize="none"
         keyboardType="email-address"
       />
       {errors.email && <Text style={styles.error}>{errors.email}</Text>}

       <TextInput
         style={styles.input}
         placeholder="Password"
         secureTextEntry
         value={password}
         onChangeText={setPassword}
       />
       {errors.password && <Text style={styles.error}>{errors.password}</Text>}


       <TextInput
         style={styles.input}
         placeholder="Confirm Password"
         secureTextEntry
         value={confirmPassword}
         onChangeText={setConfirmPassword}
       />
       {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

       <TouchableOpacity style={styles.button} onPress={handleSignup}>
         <Text style={styles.buttonText}>Create Account</Text>
       </TouchableOpacity>

      {errors.firebase && (
        <Text style={styles.error}>{errors.firebase}</Text>
      )}

       <Text style={styles.signinText}>
         Already have an account? {' '}
         <Text style={styles.link} onPress={() => router.replace('signIn')}>
         Log in here
         </Text>
       </Text>
     </View>
   </View>
   </ScrollView>
 );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#f8f8f8',
     justifyContent: 'center',
     alignItems: 'center',
   },
   card: {
     width: '80%',
     padding: 24,
     borderRadius: 8,
     backgroundColor: '#fff',
     elevation: 3,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.3,
     shadowRadius: 4,
   },
   title: {
     fontWeight: '600',
     marginBottom: 24,
     textAlign: 'center',
     color: '#00674f',
     fontSize: 28,
   },
   input: {
     borderWidth: 1,
     borderColor: '#ccc',
     borderRadius: 6,
     padding: 12,
     marginBottom: 8,
     fontSize: 16,
   },
   error: {
     color: 'red',
     marginBottom: 8,
     fontSize: 14,
   },
   button: {
     backgroundColor: '#00674f',
     padding: 14,
     borderRadius: 6,
     alignItems: 'center',
     marginBottom: 16,
   },
   buttonText: {
     color: '#fff',
     fontSize: 16,
     fontWeight: '500',
   },
   signinText: {
     textAlign: 'center',
     color: '#333',
   },
   link: {
     textDecorationLine: 'underline',
     color: 'blue',
     fontWeight: '500',
   },
 });
