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
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import styles, {Colors, lightStyles} from '../../styles/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
//   import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {API_PATH} from '../../env';
import {useToast} from '../../contexts/toastContext';
import PhoneInput from 'react-native-phone-number-input';
import SignUpIntro from '../../components/auth/signup/signupIntro';

export default function SignupScreen() {
  const phoneInput = useRef(null);
  const {showToast} = useToast();
  const toast = useToast();
  // const [useDarkMode, setUseDarkMode] = useState('');
  // const isDarkMode = useColorScheme() === useDarkMode;
  // const {t, i18n} = useTranslation();
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    code: null,
    phone: null,
    role: '',
  });
  const [isFocused, setIsFocused] = useState(null);
  const {control, handleSubmit} = useForm();
  const [nextStep, setNextStep] = useState(0);
  const [resendOtp, setResendOtp] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const otpBoxes = useRef([]);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

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


  // useEffect(() => {
  //   StatusBar.setBarStyle(isDarkMode ? 'dark-content' : 'light-content');
  // }, [isDarkMode]);

  // const toggleTheme = () => {
  //   setUseDarkMode(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  // };
  // // Get styles based on theme
  // const lightStyles = isDarkMode ? lightStyles : lightStyles;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const fullcode = otpValues.join('');
    setUserData({...userData, code: fullcode});
  }, [otpValues])
  // console.log(userData);
  const SendOtp = async () => {
   //console.log(API_PATH)
    try {
      const sendOtp = await fetch(`${API_PATH}/client/auth/register_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      //console.log(sendOtp);
      if (sendOtp.ok) {
        showToast('OTP Sent', 'success');
        setNextStep(1);
      } else if (sendOtp.status === 401) {
        showToast('OTP not sent', 'error');
        console.log('Error Status: ', sendOtp.status);
      } else if (sendOtp.status === 406) {
        showToast('Phone already registered', 'error');
      }
    } catch (error) {
      showToast('Something Went Wrong', 'error');
      console.log('Error Message: ' + error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(
        `${API_PATH}/client/auth/verify_registration`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userData), 
        },
      );

      if (response.ok) {
        showToast('Otp Verified', 'success');
        setNextStep(2);
      } else {
        showToast('Invalid Otp', 'error');
      }
    } catch (error) {
      showToast('Something went wrong', 'error');
      console.log('Error Message: ' + error);
    }
  };

  const handleSignUp = async () => {
    if(!userData.firstname || !userData.lastname || !userData.email){
      showToast('Fill Required Fields', 'error');
    }
    else{
      try {
        const response = await fetch(`${API_PATH}/client/auth/register`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          showToast('Signup Succesful', 'success');
          navigation.navigate('Login');
        } else {
          showToast('Signup Unsuccessful', 'error');
        }
      } catch (error) {
        showToast('Something Went Wrong', 'error');
        console.log('Error Message: ' + error);
      }
    }
    
    
  };
  //console.log(userData);
  return (
    <>
    <StatusBar backgroundColor="#037F41" />
    <SafeAreaView style={[lightStyles.container, styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
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

        <View style={[styles.mt4]}>
          {/* <ToastComponent message={'otp sent'} type={'success'} /> */}
          <Text style={[styles.headingMedium, lightStyles.headingText]}>
            Create Account
          </Text>
          <View
            style={[{height: 2, width: '16%'}, styles.mb1, lightStyles.bg]}
          />
          {nextStep !== 2 ? (
            <Text style={[styles.paragraph, {color: '#a1a1a1', fontSize: 15}]}>
              Create your account to access products, services, orders,
              memberships, and more
            </Text>
          ) : null}
        </View>
        {nextStep === 0 ? (
          <>
            <PhoneInput
              defaultValue={userData.phone}
              defaultCode="IN"
              //layout="first"
              onChangeText={text => {
                setUserData({...userData, phone: text});
              }}
              onChangeFormattedText={text => {
                setUserData({...userData, phone: text});
              }}
              containerStyle={{paddingVertical: 0, paddingHorizontal: 0, width: '100%'}}
              flagButtonStyle={{padding:0, backgroundColor: '#f5f5f5', height: 50, width: 76, paddingRight:3, borderTopLeftRadius: 6, borderBottomLeftRadius: 6}}
              textContainerStyle={{padding: 0, paddingHorizontal: 0, paddingVertical: 0, color: '#333', height:50, borderTopRightRadius: 6, borderBottomRightRadius: 6}}
              //textInputStyle={{color: '#333'}}
            />

            <TouchableOpacity
              style={[styles.btnCont, styles.btnPrimary]}
              onPress={SendOtp}>
              <Text
                style={[styles.btnText,{fontSize: 16,color:Colors.white}]}>
                Send OTP
              </Text>
            </TouchableOpacity>
          </>
        ) : nextStep === 1 ? (
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
                    borderColor: '#1e293b',
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
              style={[styles.btnCont, styles.btnPrimary]}
              onPress={verifyOtp}>
              <Text
                style={[styles.btnText, {fontSize: 16,color:Colors.white}]}>
                Verify OTP
              </Text>
            </TouchableOpacity>
         
          </>
        ) : nextStep > 1 ? (
          <SignUpIntro nextStep={nextStep} setNextStep={setNextStep} handleSignUp={handleSignUp} userData={userData} setUserData={setUserData} />
        ) : null}
        {nextStep === 1 && (
          <TouchableOpacity
            style={{alignItems: 'center', marginTop: 20}}
            onPress={SendOtp}>
            <Text
              style={[styles.btnText, lightStyles.headingText, {fontSize: 16}]}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
    </>
  );
}
