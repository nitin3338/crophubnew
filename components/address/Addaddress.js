import React ,{useState}from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, {Colors, fonts} from '../../styles/style';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const CustomInput = ({ label, value, onChangeText, isCompulsory }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  return (
    <View style={modalStyles.inputContainer}>
      <Text style={[modalStyles.label, isFocused || isFilled ? modalStyles.labelFocused : null]}>
        {label}
        {isCompulsory && <Text style={{ color: 'red' }}>*</Text>}
      </Text>
      <TextInput
        style={modalStyles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default function Addaddress({isVisible, onClose}) {
  const navigation = useNavigation();
  const [address, setAddress] = useState('');

  const handleInputChange = text => {
    setAddress(text);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View
          style={[modalStyles.modalContainer, {height: windowHeight * 0.6}]}>
          <ScrollView>
            <View style={modalStyles.header}>
              <Text
                style={[
                  styles.headingNormal,
                  {fontFamily: fonts.medium, color: Colors.darkBlue},
                ]}>
                Address Details
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={modalStyles.closeButton}>
                <Ionicons name="close" size={25} color={Colors.darkBlue} />
              </TouchableOpacity>
            </View>
            <View style={{paddingRight: 20, marginTop: -20}}>
              <Text style={{fontSize: 12, fontFamily: fonts.italic}}>
                Complete address would assist better us in serving you
              </Text>
            </View>
            <View style={modalStyles.content}>
              <View
                style={{
                  borderBottomColor: Colors.lightgrey,
                  borderBottomWidth: 1,
                  marginTop: 20,
                }}></View>
              <Text
                style={{fontSize: 14, marginTop: 20, fontFamily: fonts.light}}>
                Select Address Type
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={modalStyles.tagContainer}>
              <TouchableOpacity style={modalStyles.tag}>
                <Text style={modalStyles.tagText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.tag}>
                <Text style={modalStyles.tagText}>Office</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.tag}>
                <Text style={modalStyles.tagText}>Neighbour</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.tag}>
                <Ionicons name="add" size={20} color={Colors.darkBlue} />
              </TouchableOpacity>
            </ScrollView>
            <View>
             
            <CustomInput label="Receiver's Name" value={address} onChangeText={handleInputChange} isCompulsory={true} />
            
            <CustomInput label="Complete Address" value={address} onChangeText={handleInputChange} isCompulsory={true} />
            <CustomInput label="Nearby Landmark" value={address} onChangeText={handleInputChange} />
            </View>
            <View>
              <TouchableOpacity style={modalStyles.button}>
                <Text style={modalStyles.buttonText}>Add Address</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  closeButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  content: {
    // Add styles for your content
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.lightgrey,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: Colors.darkBlue,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 20,
    fontSize: 16,
    color: Colors.lightgrey,
    fontFamily: fonts.regular,
    zIndex: -1,
    // transition: 'top 0.2s, font-size 0.2s',
  },
  labelFocused: {
    top: -10,
    fontSize: 12,
    color: Colors.darkBlue,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius:5,
    marginTop: 10,
    fontSize: 16,
    fontFamily: fonts.regular,
    paddingVertical: 5,
  },
  button:{
    backgroundColor: Colors.darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText:{
    color: Colors.white,
    fontSize: 16,
    fontFamily: fonts.medium,
    textAlign: 'center',
  }

});
