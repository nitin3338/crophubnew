import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styles, {lightStyles, darkStyles, Colors} from '../../styles/style';

const Dropdown = ({label, options, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options && options.length > 0 ? options[0] : null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = option => {
    setSelectedOption(option);
    onSelect(option);
    toggleDropdown();
  };
  console.log(selectedOption);
  return (
    <View style={[styles.pickerContainer, darkStyles.fieldsBg]}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
        <Text style={[darkStyles.bgText]}>
          {label} {selectedOption?.name}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.optionsContainer, darkStyles.fieldsBg]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}
              style={[styles.option]}
            >
              <Text style={[darkStyles.bgText]}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};


export default Dropdown;
