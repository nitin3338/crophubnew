import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/slices/userSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles, {Colors, fonts} from '../../styles/style';
import CustomModal from './CustomModal';
import {useRoute} from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector(selectUser);
  const [isModalVisible, setModalVisible] = useState(false);
  //console.log(user);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //   useEffect(() => {
  //     if (user && user?.data?.name) {
  //       setUsername(user.data.name);
  //       setEmail(user.data.email);
  //     } else {
  //       setUsername('Guest');
  //     }
  //   }, [user]);

  return (
    <>
      <StatusBar backgroundColor="#037F41" />
      <SafeAreaView
        style={[styles.customHeaderContainer, {backgroundColor: '#037F41'}]}>
        <View style={styles.customHeaderContainer.headerIcons}>
          {/* Use the CustomModal component */}
          <CustomModal isVisible={isModalVisible} toggleModal={toggleModal} />
          <TouchableOpacity
            onPress={() => toggleModal()}
            style={[styles.customHeaderContainer.headerIcon]}>
            <Feather name="align-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.customHeaderContainer.headerIcons}>
            {/* <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={25} color= {'#FFF'}  />
                </TouchableOpacity> */}
            <Text
              style={{
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: 16,
                fontFamily: fonts.italic,
              }}>
             Hi {user?.firstname}
            </Text>
          </View>
        </View>
        <View style={styles.customHeaderContainer.headerIcons}>
          <TouchableOpacity style={[styles.customHeaderContainer.headerIcon]}>
            <Text>
              <Ionicons
                name="notifications-outline"
                size={25}
                color={Colors.white}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customHeaderContainer.headerIcon]} >
            <Text>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={25}
                color={Colors.white}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customHeaderContainer.headerIcon]} onPress={()=>navigation.navigate('Cart')}>
            <Text>
              <Feather name="shopping-bag" size={25} color={Colors.white} />
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CustomHeader;
