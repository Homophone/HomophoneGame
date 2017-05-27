/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native'
import { StyleProvider, Button, Text, Icon } from 'native-base'
import { lightBlue, darkBlue, orange, white } from '../colors'

export default class Play extends Component {
  static navigationOptions = {
    title: '3 / 5',
    headerStyle: {
      backgroundColor: white
    },
    headerTitleStyle: {
      color: darkBlue
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 46, color: white, fontWeight: 'bold', marginBottom: 30 }}>
          Game
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightBlue,
    padding: 20
  }
})

AppRegistry.registerComponent('Play', () => Play)
