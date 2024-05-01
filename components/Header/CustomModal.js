import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Modal from 'react-native-modal';
import CustomDrawer from "./CustomDrawer";

const CustomModal = ({ isVisible, toggleModal }) => {

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="left"  // This allows users to swipe left to close the modal
      animationIn="slideInLeft"  // Animation to slide in from the left
      animationOut="slideOutLeft"  // Animation to slide out to the right
      onSwipeComplete={toggleModal}
      swipeThreshold={50}  // Swipe distance before modal closes
      backdropColor="rgba(0,0,0,0.5)"  // Semi-transparent backdrop
      backdropOpacity={1}
      style={localstyles.modal}
    >
       <View style={[localstyles.modalContent,{backgroundColor:'#fff'}]}>
        {/* Render the CustomDrawer here */}
        <CustomDrawer onClose={toggleModal} />
      </View>
    </Modal>
  );
};

const localstyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  modalContent: {
    padding: 0,
    height: '100%',
    position: 'relative',
    width: '80%'
  },
});

export default CustomModal;
