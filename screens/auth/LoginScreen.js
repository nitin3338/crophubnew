import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  useColorScheme,
  StatusBar,
} from 'react-native';
import {useForm} from 'react-hook-form';
import styles, {Colors, darkStyles, fonts, lightStyles} from '../../styles/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setUser} from '../../redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import {API_PATH} from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from '../../contexts/toastContext';
import {useSelector} from 'react-redux';
// import { selectLocation } from '../../redux/slices/locationSlice'
import PhoneInput from 'react-native-phone-number-input';
import LoaderSmall from '../../components/loaders/LoaderSmall';

export default function Login({navigation}) {
  const phoneInput = useRef(null);
  const {showToast} = useToast();
  const {control, handleSubmit} = useForm();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [jwtToken, setJwtToken] = useState(null);
  const [nextStep, setNextStep] = useState(0);
  const [otpSet, setOtpSet] = useState(true);
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const otpBoxes = useRef([]);

  const [userData, setUserData] = useState({
    username: '',
    code: '' || otpValues,
  });

  const handleChangeText = (text, index) => {
    if (text.length === 1 && index < otpValues.length - 1) {
      // Move focus to the next OTP box
      otpBoxes.current[index + 1].focus();
    }

    // Update OTP value
    const updatedOtpValues = [...otpValues];
    updatedOtpValues[index] = text;
    setOtpValues(updatedOtpValues);
  };

  
  
  const sendLoginOTP = async () => {
    setIsLoading(true);
    try {
      // Validate phone number
      const response = await fetch(`${API_PATH}/client/auth/send_login_otp`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        showToast('OTP Sent', 'success');
        setNextStep(1); // Move to next step after sending OTP
        setIsLoading(false);
      } else {
        showToast('Failed to send OTP', 'error');
        setIsLoading(false);
      }
    } catch (error) {
      showToast('Something went wrong', 'error');
      console.error('Error Message: ' + error);
      setIsLoading(false);
    }
  };

  // OTP Formation and Handling functions

  useEffect(() => {
    const fullCode = otpValues.join('');
    setUserData({...userData, code: fullCode});
  }, [otpValues]);

  const HandleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_PATH}/client/auth/login_with_otp`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
      });
     
      if (response.ok) {
        const data = await response.json();
       // console.log(data);
        const token = data?.data?.token;
        dispatch(setUser(data?.data));
        await AsyncStorage.setItem('jwtToken', token);
        setJwtToken(token);

        setNextStep(1);
        showToast('Welcome To Crophub', 'success');
        console.log(data?.data);
        setTimeout(() => {
          if(data?.data?.activeSessions > 3){
            navigation.navigate('ActiveSessions');
          }
          else{
            navigation.navigate('Home');
          }
        }, 2000);
        
        setIsLoading(false);
      } else if (response.status === 400) {
        showToast('Invalid OTP', 'error');
        setIsLoading(false);
      } else if (response.status === 401) {
        showToast('OTP Expired', 'error');
        setIsLoading(false);
      } 
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoading(false);
    }
  };
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

 //console.log(userData);
  return (
    <>
    <StatusBar backgroundColor="#037F41" />
    <SafeAreaView style={[lightStyles.container, styles.container]}>
      <ScrollView>
        <View style={[styles.mt8, {alignItems: 'center'}]}>
          <Animated.Image
            source={require('../../assets/crophub-icon.png')}
            style={[
              {width: 100, height: 100},
              styles.mb2,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </View>
        
        <View style={[styles.mt6]}>
          <Text style={[styles.headingMedium, lightStyles?.headingText || {}]}>
            Login
          </Text>
          <View
            style={[{height: 2, width: '16%'}, styles.mb1, lightStyles.bg]}
          />
          <Text
            style={[
              styles.paragraph,
              {paddingRight: 50, color: '#a1a1a1', fontSize: 15},
            ]}>
            Sign in to your account to access your products/services
          </Text>
        </View>

        <View>
          

          {nextStep === 0 && (
            <>
             <PhoneInput
              defaultValue={userData.username}
              defaultCode="IN"
              //layout="first"
              onChangeText={text => {
                setUserData({...userData, username: text});
              }}
              onChangeFormattedText={text => {
                setUserData({...userData, username: text});
              }}
              containerStyle={{paddingVertical: 0, paddingHorizontal: 0, width: '100%'}}
              flagButtonStyle={{padding:0, backgroundColor: '#f5f5f5', height: 50, width: 76, paddingRight:3, borderTopLeftRadius: 6, borderBottomLeftRadius: 6}}
              textContainerStyle={{padding: 0, paddingHorizontal: 0, paddingVertical: 0, color: '#333', height:50, borderTopRightRadius: 6, borderBottomRightRadius: 6}}
              //textInputStyle={{color: '#333'}}
            />
            <TouchableOpacity
              style={[
                styles.btn,
                styles.btnFull,
                styles.btnMedium,
                {backgroundColor: Colors.darkBlue},
              ]}
              onPress={sendLoginOTP}
              disabled={isLoading ? true : false}
              >
                
                {isLoading ? <LoaderSmall color={Colors.white}/> :
             <Text style={[styles.btnText,{color:'#fff'
            }]}>SEND OTP</Text>
            }
            </TouchableOpacity>
            </>
          )}

          {nextStep === 1
            ? (
              <>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 10, paddingHorizontal: 15 }}>
              {otpValues.map((value, index) => (
                <TextInput
                  key={index}
                  ref={ref => (otpBoxes.current[index] = ref)}
                  placeholder="•"
                  value={value}
                  onChangeText={text => handleChangeText(text, index)}
                  style={{
                    paddingHorizontal: 10,
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    borderWidth: 1,
                    fontSize: 25,
                    borderColor: Colors.darkBlue,
                    textAlign: 'center',
                    fontSize: 20,
                    letterSpacing: 5,
                    color: 'black',
                  }}
                  maxLength={1}
                  keyboardType="numeric"
                />
              ))}
            </View>
            
             <TouchableOpacity
             style={[
               styles.btn,
               styles.btnFull,
               styles.btnMedium,
              // styles.btnPrimary,
             {backgroundColor:Colors.darkBlue}]}
             onPress={HandleLogin}
             disabled={isLoading ? true : false}
             >
            {isLoading ? <LoaderSmall color={Colors.white}/> :
             <Text style={[styles.btnText,{color:'#fff'
            }]}>Login</Text>
            }
            
           </TouchableOpacity>
           </>
            )
            : null}

       

          <View
            style={[
              styles.plr1,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}></View>

          <View style={[ styles.plr2,{flexDirection:'row',alignItems:'center', gap:3}]}>
            <Text style={{fontSize:14,fontFamily:fonts.italic}}>Doesn't have account !</Text>
            <TouchableOpacity
              style={[styles.btn,{alignItems:'center'}]}
              onPress={() => navigation.navigate('Signup')}>
              <Text
                style={[
                  lightStyles.headingText,
                  {fontWeight: '600', fontSize: 18,color:'#1e293b'},
                ]}>
                Create Account
              </Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}
