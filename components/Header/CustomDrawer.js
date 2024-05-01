import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles, { Colors, lightStyles, darkStyles } from '../../styles/style';
import { useNavigation } from '@react-navigation/native';
import { API_PATH } from '../../env';

const CustomDrawer = ({ onClose }) => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // console.log(user);
  const handleLogOut = async () => {
    try {

      const logoutServer = await fetch(`${API_PATH}/client/auth/logout`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ id: user?.id })
      })

      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderLinks = () => {
    if (!user || !user.role) {
      return null;
    }

    const role = user.role.toLowerCase();

    if (role === 'farmer') {
      return (
        <>
          <DrawerItem text="Home" icon="home-outline" route="Home" />
          <DrawerItem text="Products" icon="cube-outline" route="Products" />
          <DrawerItem text="Services" icon="paw-outline" route="Services" />
          <DrawerItem text="Chat" icon="chatbubbles-outline" route="Chat" />
          <DrawerItem text="Consultation" icon="calendar-outline" route="Consultation" />
          <DrawerItem text="Invoices" icon="documents-outline" route="Invoices" />
          <DrawerItem text="Settings" icon="settings-outline" route="Settings" />
          {/* Add other farmer-specific links here */}
        </>
      );
    } else if (role === 'expert') {
      return (
        <>
          <DrawerItem text="Chat" icon="chatbubbles-outline" route="Chat" />
          <DrawerItem text="Consultation" icon="calendar-outline" route="Consultation" />
          <DrawerItem text="Settings" icon="settings-outline" route="Settings" />
        </>
      );
    } else if (role === 'merchant') {
      return (
        <>
          <DrawerItem text="Home" icon="home-outline" route="Home" />
          <DrawerItem text="My Products" icon="cube-outline" route="Products" />
          <DrawerItem text="My Orders" icon="albums-outline" route="Orders" />
          <DrawerItem text="Invoices" icon="documents-outline" route="Invoices" />
          <DrawerItem text="Settings" icon="settings-outline" route="Settings" />
        </>
      );
    }
  };

  const DrawerItem = ({ text, icon, route }) => (
    <TouchableOpacity style={localStyles.drawerItem} onPress={() => navigation.navigate(route)}>
      <Ionicons name={icon} size={22} />
      <Text style={localStyles.drawerItemText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View>
        <TouchableOpacity onPress={onClose} style={[styles.toggleClose, { backgroundColor: '#e1e2e3' }]}>
          <Ionicons name="close-outline" size={25} style={{ color: '#333' }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'left', borderBottomWidth: 1, borderStyle: 'solid', borderColor: Colors.lightgrey, paddingHorizontal: 5, paddingVertical: 30, gap: 10 }}>
        <Image source={!user?.image ? require('../../assets/Pic/user.png') : { uri: `${API_PATH}${user?.image}` }} style={{ height: 50, width: 50, borderRadius: 100 }} />
        <View>
          {user ? (
            <>
              <Text style={[{ fontSize: 17, fontWeight: 600 }]}>Hi {user?.firstname}</Text>
              <Text style={{ fontSize: 12, color: 'grey', maxWidth: 200 }} numberOfLines={1} ellipsizeMode="tail">{user?.email}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'left', gap: 6, alignItems: 'center' }}>
                <TouchableOpacity><Text style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>{user?.role}</Text></TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity onPress={handleLogOut} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Text style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'red' }}>LogOut</Text>
                  <Ionicons name="log-out-outline" size={20} color={'red'} />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={{ fontSize: 17, fontWeight: 600 }}>Hi Guest</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'left', gap: 6, alignItems: 'center' }}>
                <TouchableOpacity><Text style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>Account</Text></TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity onPress={handleLogOut}>
                  <Text style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'red' }}>Login/SignUp</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <ScrollView nestedScrollEnabled style={[{ flex: 1 }]}>
            {renderLinks()}
          </ScrollView>
          <View style={[styles.menuHelpCenter]}>
            <Text style={[{ fontSize: 18, fontWeight: '600' }]}>Help Center</Text>
            <TouchableOpacity style={[styles.menuHelpCenter.Items, styles.mt3, { backgroundColor: Colors.lightgrey }]}>
              <Ionicons name="headset-outline" size={18} />
              <Text style={[styles.menuHelpCenter.Text]}>Chat With Support Team </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuHelpCenter.Items, { backgroundColor: Colors.lightgrey }]}>
              <Ionicons name="mail-unread-outline" size={18} />
              <Text style={[styles.menuHelpCenter.Text]}>Support Ticket Center</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuHelpCenter.Items, { backgroundColor: Colors.lightgrey }]}>
              <Ionicons name="call-outline" size={18} />
              <Text style={[styles.menuHelpCenter.Text, { color: '#258af7' }]}>+91 916 116 9360</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.plr2, styles.mt4]}>
            <Text style={{ fontSize: 12, color: '#c4c2c2' }}>© 2023 Crophub Agritech LLC®</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const localStyles = StyleSheet.create({
  drawerItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 16,
  },
});

export default CustomDrawer;
