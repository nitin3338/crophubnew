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
  import Ionicons from 'react-native-vector-icons/Ionicons';
  //   import {useTranslation} from 'react-i18next';
  import {useNavigation} from '@react-navigation/native';
import styles, {Colors, lightStyles, darkStyles} from '../../../styles/style';


function SignUpIntro({nextStep, setNextStep, handleSignUp, userData, setUserData}) {
    const [isFocused, setIsFocused] = useState(null);
    const {control, handleSubmit} = useForm();
    const [resendOtp, setResendOtp] = useState(false);
  const navigation = useNavigation();
  return nextStep === 2 ? (
    <View>
      <TouchableOpacity
        onPress={() => {
          setUserData({...userData, role: 'farmer'}), setIsFocused(0);
        }}>
        <View
          style={[
            styles.col3,
            {backgroundColor: '#d4d9fc'},
            isFocused === 0 && {opacity: 0.4},
          ]}>
          <Image
            source={require('../../../assets/Pic/farmer.png')}
            style={{width: 80, height: 80}}
          />
          <View>
            <Text style={{fontSize: 20, fontWeight: '600'}}>Farmer</Text>
            <Text style={{fontSize: 14}}>"I Produce Crops."</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.mt3]}
        onPress={() => {
          setUserData({...userData, role: 'merchant'}), setIsFocused(1);
        }}>
        <View
          style={[
            styles.col3,
            {backgroundColor: '#F2E6DC'},
            isFocused === 1 && {opacity: 0.4},
          ]}>
          <Image
            source={require('../../../assets/Pic/corporate.png')}
            style={{width: 80, height: 80}}
          />
          <View>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              Buyer/Corporate
            </Text>
            <Text style={{fontSize: 14}}>"I Purchase the Crop"</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.mt3]}
        onPress={() => {
          setUserData({...userData, role: 'expert'}), setIsFocused(2);
        }}>
        <View
          style={[
            styles.col3,
            {backgroundColor: '#E3F7F1'},
            isFocused === 2 && {opacity: 0.4},
          ]}>
          <View>
            <Text style={{fontSize: 20, fontWeight: '600'}}>Expert</Text>
            <Text style={{fontSize: 14}}>"I Produce Crop."</Text>
          </View>
          <Image
            source={require('../../../assets/Pic/expert.png')}
            style={{width: 80, height: 80}}
          />
        </View>
      </TouchableOpacity>
      {userData?.roles !== '' ? (
        <TouchableOpacity
          onPress={() => setNextStep(3)}
          style={[styles.btn, styles.btnMedium, styles.btnPrimary]}>
          <Text style={{color: '#fff'}}>Next</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  ) : nextStep === 3 ? (
    <>
      <View style={{flexDirection: 'row', gap: 5}}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor={lightStyles.headingText.color}
          name="firstname"
          control={control}
          rules={{required: true}}
          style={[
            styles.input,
            styles.inputWidth50,

            {
              borderColor: isFocused ? '#1e293b' : 'lightgrey',
              color: lightStyles.headingText.color,
            },
          ]}
          onChangeText={value => {
            setUserData({...userData, firstname: value});
          }}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor={lightStyles.headingText.color}
          name="lastname"
          control={control}
          rules={{required: true}}
          style={[
            styles.input,
            styles.inputWidth50,

            {
              borderColor: isFocused ? '#1e293b' : 'lightgrey',
              color: lightStyles.headingText.color,
            },
          ]}
          onChangeText={value => {
            setUserData({...userData, lastname: value});
          }}
        />
      </View>
      <TextInput
        placeholder="Email"
        placeholderTextColor={lightStyles.headingText.color}
        name="email"
        control={control}
        rules={{required: true}}
        style={[
          styles.input,
          styles.inputWidth100,

          {
            borderColor: isFocused ? '#1e293b' : 'lightgrey',
            color: lightStyles.headingText.color,
          },
        ]}
        onChangeText={value => {
          setUserData({...userData, email: value});
        }}
      />
      <TouchableOpacity
        style={[styles.btnCont, styles.btnMedium, styles.btnPrimary]}
        onPress={handleSignUp}>
        <Text style={[styles.btnText,{fontSize: 16,color:'#fff'}]}>
          Signup
        </Text>
      </TouchableOpacity>
    </>
  ) : null;
}

export default SignUpIntro;
