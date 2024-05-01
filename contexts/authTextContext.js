import React, { createContext, useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUserData = async () => {
      // Dummy user data
      const data = {
        
  "activeSessions": 1,
  "createdAt": "2024-04-03T08:15:11.966Z",
  "email": "nitinpandey3338@gmail.com",
  "emailAllowed": true,
  "firstname": "Adarsh ",
  "id": "660d100f2acf137f5a05b02f",
  "image": null,
  "isActive": true,
  "isDeleted": false,
  "lastname": "Pandey",
  "loginOTP": { "code": "7886", "expireTime": "2024-04-03T14:16:00.366Z" },
  "loginRetryLimit": 0,
  "marketingEmails": true,
  "name": "Adarsh  Pandey",
  "phone": "+916394528883",
  "pushAllowed": true,
  "role": "expert",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGQxMDBmMmFjZjEzN2Y1YTA1YjAyZiIsInVzZXJuYW1lIjoiVVJfMTEwMDAwMDAwMDEwMDAxODEwMiIsImlhdCI6MTcxMjEzMjE4MiwiZXhwIjo2ODk2MTMyMTgyfQ.aHP8KF8EZ-KTPC-6B18kskcIzGtFoZV6tlmgDlttebU",
  "updatedAt": "2024-04-03T08:16:00.367Z",
  "userType": 1,
  "username": "UR_1100000000100018102",
  "whatsappAllowed": true
      };

      try {
        // Set user data in AsyncStorage
        await AsyncStorage.setItem('token', data?.token);
        // Set user data in local state
        setUserData(data);
        // Dispatch action to set user data in Redux store
        dispatch(setUser(data));
      } catch (error) {
        console.error('Error initializing user data:', error);
      }
    };

    initializeUserData();
  }, [dispatch]);


  const login = async (data) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      setUserData(data);
      if (data.token) {
        dispatch(setUser(data));
      }
    } catch (e) {
      console.error('Error storing user data:', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUserData(null);
      dispatch(setUser(null));
    } catch (e) {
      console.error('Error removing user data:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
