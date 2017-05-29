import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native'
import { Button, Text } from 'native-base'
import { lightBlue, darkBlue, orange, white } from '../colors'

export default class Play extends Component {
  static navigationOptions = {
    title: '3 / 5',
    headerStyle: {
      backgroundColor: white
    },
    headerTintColor: darkBlue
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/bear.jpg')}
            style={styles.image}
          />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progress} />
        </View>

        <Button
          block
          rounded
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
        >
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>BEAR</Text>
        </Button>

        <Button
          block
          rounded
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
        >
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>BARE</Text>
        </Button>

        <Button
          block
          rounded
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
        >
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>BAIR</Text>
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
  },
  image: {
    width: '100%'
  },
  imageContainer: {
    width: 328,
    height: 328,
    overflow: 'hidden',
    borderRadius: 4
  },
  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: white,
    margin: 10,
    borderRadius: 10
  },
  progress: {
    width: '20%',
    height: '100%',
    backgroundColor: orange,
    borderRadius: 10
  }
})

AppRegistry.registerComponent('Play', () => Play)
