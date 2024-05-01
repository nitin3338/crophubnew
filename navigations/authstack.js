import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector,useDispatch } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import Onboarding from '../screens/auth/Onboarding';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../components/ui/HomeScreen';
import CropAgreement from '../screens/common/agreements/CropAgreement';
import Consultation from '../screens/common/consultations/Consultation';
import Crops from '../components/crops/Crops';
import Invoices from '../screens/common/orders/Invoices';
import Cart from '../screens/common/orders/Cart';
import Chat from '../components/messages/Chat';
import Orders from '../screens/common/orders/Orders';
import ProductsDetail from '../screens/common/product/ProductDetail';
import {setUser} from '../redux/slices/userSlice';
import Checkout from '../screens/common/orders/Checkout';
import UpdateProfile from '../screens/common/profiles/UpdateProfile';
import Products from '../screens/common/product/Products';
import Services from '../services/Services';
import Settings from '../screens/common/settings/Settings';
import BookConsultation from '../screens/common/consultations/BookConsultation';
import Address from '../components/address/Address';
import Addaddress from '../components/address/Addaddress';
import ActiveSessions from '../screens/auth/ActiveSessions';

const Stack = createNativeStackNavigator();

let token;

const AuthNavigation = () => {
  
  const dispatch = useDispatch(); 
  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userRole = await AsyncStorage.getItem('userRole'); // Assuming role is also stored
        dispatch(setUser({ token, userRole })); // Update Redux state
      } catch (error) {
        console.error('Error retrieving user token/role:', error);
      }
    };

    checkUserToken();
  }, []);

  const getInitialRoute = () => {
    return token !== null ? 'Main' : 'Onboarding';
  };
  const userRole = useSelector(selectUser).userRole;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRoute()}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>

        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CropAgreement" component={CropAgreement} />
        <Stack.Screen name="Consultation" component={Consultation} />
        <Stack.Screen name="Crop" component={Crops} />
        <Stack.Screen name="Invoices" component={Invoices} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ProductDetail" component={ProductsDetail} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="BookConsultation" component={BookConsultation} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Addaddress" component={Addaddress} />
        <Stack.Screen name="ActiveSessions" component={ActiveSessions} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
