import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AuthNavigation from './navigations/authstack';
import {Provider} from 'react-redux';
import store from './redux/store';
import {ToastProvider} from './contexts/toastContext';
import {setUser} from './redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from './contexts/authTextContext';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastProvider>
          <AuthNavigation />
        </ToastProvider>
      </AuthProvider>
    </Provider>
  );
}
