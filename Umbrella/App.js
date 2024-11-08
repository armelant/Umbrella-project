// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RegisterScreen from './screens/RegisterScreen';
// import VerifyEmailScreen from './screens/VerifyEmailScreen';
// import HomeScreen from './screens/HomeScreen';
// import UmbrellasScreen from './screens/UmbrellasScreen';
// import ActiveRentalScreen from './screens/ActiveRentalScreen';
// import WelcomeScreen from './screens/WelcomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import ProfileScreen from './screens/ProfileScreen';

// const Stack = createStackNavigator();

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const userId = await AsyncStorage.getItem('userId');
//       if (userId) {
//         setIsLoggedIn(true);
//       }
//     };
//     checkLoginStatus();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Welcome"
//           component={WelcomeScreen}
//           options={{ headerShown: false }}
//         />
//         {isLoggedIn ? (
//           <>
//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="UmbrellasScreen" component={UmbrellasScreen} />
//             <Stack.Screen name="ActiveRental" component={ActiveRentalScreen} />
//             <Stack.Screen name="Profile" component={ProfileScreen} />
//           </>
//         ) : (
//           <>
//             <Stack.Screen
//               name="Register"
//               component={RegisterScreen}
//               options={{ headerShown: true }}
//             />
//             <Stack.Screen
//               name="Login"
//               component={LoginScreen}
//               options={{ headerShown: true }}
//             />
//             <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
//             <Stack.Screen name="Home" component={HomeScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './store';
import RegisterScreen from './screens/RegisterScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import HomeScreen from './screens/HomeScreen';
import UmbrellasScreen from './screens/UmbrellasScreen';
import ActiveRentalScreen from './screens/ActiveRentalScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setIsLoggedIn(!!userId);
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (isLoading) return null;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
            initialParams={{ isLoggedIn }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UmbrellasScreen" component={UmbrellasScreen} />
          <Stack.Screen name="ActiveRental" component={ActiveRentalScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
