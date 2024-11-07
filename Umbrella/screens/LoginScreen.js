// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, { useState } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { Formik } from 'formik';
// import * as Yup from 'yup';

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Required'),
//   password: Yup.string().min(6, 'Too Short!').required('Required'),
// });

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [secureEntry, setSecureEntry] = useState(true);

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   const handleSignup = () => {
//     navigation.navigate('Signup');
//   };

//   // Function to handle login
//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://192.168.1.141:3000/login', {
//         email,
//         password,
//       });

//       // If login is successful
//       if (response.status === 200) {
//         Alert.alert('Success', response.data.msg);
//         navigation.navigate('Home');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', error.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
//         <Ionicons name={'arrow-back-outline'} color={'#000000'} size={25} />
//       </TouchableOpacity>
//       <View style={styles.textContainer}>
//         <Text style={styles.headingText}>Hey,</Text>
//         <Text style={styles.headingText}>Welcome</Text>
//         <Text style={styles.headingText}>Back</Text>
//       </View>
//       {/* form  */}
//       <View style={styles.formContainer}>
//         <View style={styles.inputContainer}>
//           <Ionicons name={'mail-outline'} size={30} color={'#BDBDBD'} />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter your email"
//             placeholderTextColor={'#BDBDBD'}
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <SimpleLineIcons name={'lock'} size={30} color={'#BDBDBD'} />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter your password"
//             placeholderTextColor={'#BDBDBD'}
//             secureTextEntry={secureEntry}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity
//             onPress={() => {
//               setSecureEntry((prev) => !prev);
//             }}
//           >
//             <SimpleLineIcons
//               name={secureEntry ? 'eye' : 'eye-off'}
//               size={20}
//               color={'#BDBDBD'}
//             />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//           onPress={handleLogin}
//           style={styles.loginButtonWrapper}
//         >
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableOpacity>
//         <Text style={styles.continueText}>or continue with</Text>
//         <TouchableOpacity style={styles.googleButtonContainer}>
//           <Image
//             source={require('../assets/google.png')}
//             style={styles.googleImage}
//           />
//           <Text style={styles.googleText}>Google</Text>
//         </TouchableOpacity>
//         <View style={styles.footerContainer}>
//           <Text style={styles.accountText}>Don’t have an account?</Text>
//           <TouchableOpacity onPress={handleSignup}>
//             <Text style={styles.signupText}>Sign up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 20,
//   },
//   backButtonWrapper: {
//     height: 40,
//     width: 40,
//     backgroundColor: '#D9D9D9',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   textContainer: {
//     marginVertical: 20,
//   },
//   headingText: {
//     fontSize: 32,
//   },
//   formContainer: {
//     marginTop: 20,
//   },
//   inputContainer: {
//     borderWidth: 1,
//     borderColor: '#D9D9D9',
//     borderRadius: 100,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 2,
//     marginVertical: 10,
//   },
//   textInput: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   forgotPasswordText: {
//     textAlign: 'right',
//     marginVertical: 10,
//   },
//   loginButtonWrapper: {
//     backgroundColor: '#D9D9D9',
//     borderRadius: 100,
//     marginTop: 20,
//   },
//   loginText: {
//     fontSize: 20,
//     textAlign: 'center',
//     padding: 10,
//   },
//   continueText: {
//     textAlign: 'center',
//     marginVertical: 20,
//     fontSize: 14,
//   },
//   googleButtonContainer: {
//     flexDirection: 'row',
//     borderWidth: 2,
//     borderColor: '#D9D9D9',
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     gap: 10,
//   },
//   googleImage: {
//     height: 20,
//     width: 20,
//   },
//   googleText: {
//     fontSize: 20,
//   },
//   footerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//     gap: 5,
//   },
//   signupText: {
//     color: '#0000FF',
//   },
// });
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>
      {/* Formik */}
      <Formik
        initialValues={{
          email: 'Vit@student.hamk.fi',
          password: '123456789',
        }}
        onSubmit={(values) => {
          console.log(values);
          navigation.navigate('Home');
        }}
        validationSchema={LoginSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {/* Error */}
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {/* Error */}
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            {/* Login */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
