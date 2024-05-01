import React, {useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import styles, {Colors, fonts} from '../../styles/style';
// import i18next, {languageResources} from '../../Language/i18next'; // Assuming you import i18next correctly
// import {useTranslation} from 'react-i18next';
// import LanguageList from '../../Language/LanguageList.json';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Onboarding({navigation}) {
  // const {t} = useTranslation();

  // const changeLang = lng => {
  //   i18next.changeLanguage(lng);
   
  // };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
    <StatusBar backgroundColor="#037F41" />
    <SafeAreaView
      style={[
        styles.justifiedContainer,
        Colors.dimgrey,
        {paddingHorizontal: 50, backgroundColor: '#FFF'},
      ]}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.centered,
            {
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Animated.Image
            source={require('../../assets/logo-crophub.png')}
            style={[
              {width: 150, height: 41},
              styles.mb2,
              {
                opacity: fadeAnim,
              },
            ]}
          />
          <Text
            style={{
              color: Colors.secondary,
              fontSize: 14,
              fontFamily: fonts.italic,
            }}>
            Harvesting Possibilities
          </Text>
        </View>

        {/* <View style={[styles.justifyCenter, styles.mt5]}>
          {Object.keys(languageResources).map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.langBtn, styles.langBtn1]}
              onPress={() => changeLang(item)}>
              <Text
                style={{
                  color: Colors.secondary,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                {LanguageList[item].nativeName}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}
      </ScrollView>
      <TouchableOpacity
        style={{
          padding: 10,
          borderColor: Colors.primary,
          borderWidth: 2,
          borderRadius: 30,
          position: 'absolute',
          bottom: 25,
          right: 20,
        }} onPress={()=> navigation.navigate('Login')}>
        <Ionicons
          name="arrow-forward-outline"
          size={22}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
    </>
  );
}
