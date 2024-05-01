import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Image,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import styles, {lightStyles, darkStyles, Colors} from '../../../styles/style';
  import {useNavigation} from '@react-navigation/native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {useDispatch, useSelector} from 'react-redux';
  import {selectUser, setUser} from '../../../redux/slices/userSlice';
  import {API_PATH} from '../../../env';
  
  export default function Checkout() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [userInfo, setUserInfo] = useState(null);
  
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${API_PATH}/client/api/v1/user/me`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user?.token,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    };
  
    useEffect(() => {
      // Call the fetchUserInfo function when the component mounts
      fetchUserInfo();
    }, []);
    //console.log(userInfo);
    return (
      <SafeAreaView style={[darkStyles.bg, {flex: 1, position: 'relative'}]}>
        <ImageBackground source={require('../../../assets/cartBg.jpg')}>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 25,
                paddingVertical: 10,
                paddingHorizontal: 10,
                height: 120,
                zIndex: 1,
              },
            ]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                {
                  padding: 4,
                  borderWidth: 2,
                  borderColor: '#656967',
                  borderRadius: 6,
                },
              ]}>
              <Ionicons
                name="chevron-back-outline"
                size={22}
                style={{color: '#fff'}}
              />
            </TouchableOpacity>
            <Text
              style={[
                {
                  fontSize: 20,
                  fontWeight: '600',
                  color: Colors.white,
                  letterSpacing: 2,
                },
              ]}>
              Addresses
            </Text>
            <View></View>
          </View>
        </ImageBackground>
        <View
          style={[
            darkStyles.fieldsBg,
            {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              zIndex: 2,
              marginTop: -25,
              paddingHorizontal: 15,
              paddingTop: 10,
              paddingBottom: 350,
            },
          ]}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 30,
                  borderWidth: 1,
                  paddingHorizontal: 4,
                },
                darkStyles.inputbg,
              ]}>
              <TextInput
                placeholder="Find An Address"
                placeholderTextColor={Colors.dimgrey}
                style={[{flex: 1, padding: 9}, darkStyles.bgText]}
                // Add necessary props and handlers for the search functionality
              />
              <TouchableOpacity>
                <Ionicons
                  name="search"
                  size={20}
                  color="#fff"
                  style={[{padding: 10, borderRadius: 30}, darkStyles.bgText]}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.col2, darkStyles.inputbg, styles.mt6]}>
              <View style={[styles.row, {gap: 15}]}>
                <View
                  style={[darkStyles.fieldsBg, {padding: 6, borderRadius: 30}]}>
                  <Ionicons
                    name="home-outline"
                    size={22}
                    color={Colors.secondary}
                  />
                </View>
                <Text
                  style={[
                    darkStyles.bgText,
                    {fontSize: 18, fontWeight: '500'},
                  ]}>
                  Home
                </Text>
              </View>
              <View style={[styles.row,{justifyContent:'space-around'}]}>
              <View style={{width:'60%'}}>
                <Text
                  style={[
                    darkStyles.bgText,
                    {fontSize: 13},
                  ]}>
                  {userInfo?.user?.address +
                    ', ' +
                    userInfo?.user?.city +
                    ', ' +
                    userInfo?.user?.state +
                    ', ' +
                    userInfo?.user?.country}
                </Text>
                <Text style={[
                    darkStyles.bgText,
                    {fontSize: 13,paddingTop:6},
                  ]}>+91 {userInfo?.user?.phone}</Text>
              </View>
              <View>
                <Image source={require('../../../assets/map.jpg')} style={{width:70,height:70,borderRadius:80}}/>
              </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 2,
  
                zIndex: 3,
              },
              darkStyles.fieldsBg,
            ]}>
            <TouchableOpacity style={[
                styles.btnFull,
                styles.btnCircle,
                styles.btnPrimary,
                styles.btnText,
                {paddingVertical: 15},
              ]} >
              <Text style={{color: '#fff'}}>Save & Next</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
  }
  