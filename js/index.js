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
import { lightBlue, darkBlue, orange, white } from './colors'

export default class HomophoneGame extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 46, color: white, fontWeight: 'bold', marginBottom: 30 }}>
          ho·mo·phone
        </Text>

        <Icon name='home' />

        <Button block rounded style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}>
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>PLAY</Text>
        </Button>

        <Button block rounded style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}>
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>STATS</Text>
        </Button>

        <Button block rounded style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}>
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>LEADERBOARD</Text>
        </Button>
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

AppRegistry.registerComponent('HomophoneGame', () => HomophoneGame)
