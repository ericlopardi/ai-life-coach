import { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig'; 
import { AuthContext } from '../../context/AuthProvider';

export default function LoginScreen() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [errors, setErrors] = useState({});
 const router = useRouter();

 const validate = () => {
   const newErrors = {};
   // This regex checks for a basic email format: local-part@domain
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   // This regex ensures Password must be at least 8 characters long,
   // contain at least one uppercase letter, one lowercase letter, and one number
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

   if (!email.trim()) {
     newErrors.email = 'Email is required';
   }
  
   if (!emailRegex.test(email)) {
     newErrors.email = 'Invalid email format';
   }

   if (!password) {
     newErrors.password = 'Password is required';
   }

   if (!passwordRegex.test(password)) {
     newErrors.password = 'Password must contain at least 8 characters, including one uppercase letter, one number, and one special character (e.g. !@#$)';
   }

   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
 };

 const handleLogin = async () => {
  if (!validate()) return;

  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
    Alert.alert('Success', 'Logged in!');
    router.replace('/(tabs)/(home)');
  } catch (error) {
    console.log('Firebase error:', error.code);
    const newErrors = {};

    if (error.code === 'auth/invalid-credential') {
      newErrors.firebase = 'Invalid email or password';
    } else if (error.code === 'auth/user-not-found') {
      newErrors.firebase = 'User not found';
    } else if (error.code === 'auth/wrong-password') {
      newErrors.firebase = 'Invalid password';
    } else if (error.code === 'auth/invalid-email') {
      newErrors.email = 'Invalid email address';
    } else if (error.code === 'auth/network-request-failed') {
      newErrors.firebase = 'Network error. Please try again.';
    } else {
      newErrors.firebase = 'Something went wrong. Please try again.'
    }

    setErrors(newErrors);
  }
};

 return (
   <View style={styles.container}>
     <View style={styles.card}>
       <Text style={styles.title}>Log in</Text>

       <TextInput
         style={styles.input}
         placeholder="Email"
         placeholderTextColor="#888"
         value={email}
         onChangeText={setEmail}
         autoCapitalize="none"
         keyboardType="email-address"
       />
       {errors.email && <Text style={styles.error}>{errors.email}</Text>}

       <TextInput
         style={styles.input}
         placeholder="Password"
         placeholderTextColor="#888"
         secureTextEntry
         value={password}
         onChangeText={setPassword}
       />
       {errors.password && <Text style={styles.error}>{errors.password}</Text>}

       <TouchableOpacity style={styles.button} onPress={handleLogin}>
         <Text style={styles.buttonText}>Log in</Text>
       </TouchableOpacity>

      {errors.firebase && <Text style={styles.error}>{errors.firebase}</Text>}

       <Text style={styles.signupText}>
         Don't have an account?{' '}
         <Text style={styles.link} onPress={() => router.replace('signUp')}>
         Sign up here
         </Text>
       </Text>
     </View>
   </View>
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
   fontSize: 28,
   fontWeight: '600',
   marginBottom: 24,
   textAlign: 'center',
   color: '#00674f'
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
 signupText: {
   textAlign: 'center',
   color: '#333',
 },
 link: {
   textDecorationLine: 'underline',
   color: 'blue',
   fontWeight: '500',
 },
});
