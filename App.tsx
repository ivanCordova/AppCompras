import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AgregarArticuloScreen from './src/screens/AgregarArticuloScreen'
import Navigator from './src/utils/Navigator'
import AppContext from './src/utils/AppContext'

const App = () => {
  return (
    <AppContext>
      <Navigator></Navigator>
    </AppContext>
  )
}

export default App

const styles = StyleSheet.create({})