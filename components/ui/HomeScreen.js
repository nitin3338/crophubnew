import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../Header/CustomHeader'

export default function HomeScreen() {
  return (
    <View>
      <CustomHeader/>
      <Text>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})