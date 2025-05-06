import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

export default function SignUpScreen() {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [errors, setErrors] = useState({});

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

const handleSignup = () => {
   if (validate()) {
       // TODO: Send sign up request to backend/firebase here
       Alert.alert('Success', 'Account created!');
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
