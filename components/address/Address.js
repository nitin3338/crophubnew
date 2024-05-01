import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, { Colors, fonts } from '../../styles/style';
import { selectUser } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { API_PATH } from '../../env';
import { useToast } from '../../contexts/toastContext';
import Addaddress from './Addaddress'; // Import your Addaddress component

export default function Address() {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const { showToast } = useToast();
  const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);

  useEffect(() => {
    const addressData = async () => {
      try {
        const getData = await fetch(`${API_PATH}/client/auth/addresses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + user?.token,
          },
        });
        //console.log(getData);
      } catch (error) {
        showToast('Something went wrong' + error);
      }
    };
    addressData();
  }, []);

  const handleAddAddress = () => {
    setIsAddAddressVisible(true);
  }

  const handleCloseAddAddress = () => {
    setIsAddAddressVisible(false);
  }

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <ScrollView>
      <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={Colors.dimgrey}
          />
          </TouchableOpacity>

          <Text
            style={{fontSize: 18, fontWeight: '600', fontFamily: fonts.italic}}>
            Addresses
          </Text>
          <View></View>
        </View>

        <View
          style={[
            styles.col6,
            styles.mt8,
            {borderWidth: 1, borderColor: Colors.darkBlue},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="home" size={20} color={Colors.darkBlue} />
            <Text style={[styles.headingSmall, {color: Colors.darkBlue}]}>
              Home
            </Text>
          </View>
          <View>
            <Text>{user?.address}</Text>
            <Text>{user?.phone}</Text>
          </View>
        </View>

      </ScrollView>
      <TouchableOpacity
        onPress={handleAddAddress}
        style={[styles.fixedBtn]}
      >
        <Ionicons name="add" size={30} color={'#fff'} />
      </TouchableOpacity>
      <Addaddress isVisible={isAddAddressVisible} onClose={handleCloseAddAddress} />
    </SafeAreaView>
  );
}
