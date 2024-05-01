import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LoaderSmall({color}) {
  return (
    <View>
      <ActivityIndicator size={25} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({})