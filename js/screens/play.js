import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native'
import { Button, Text } from 'native-base'
import { lightBlue, darkBlue, orange, white } from '../colors'
import TimerMixin from 'react-timer-mixin'
import reactMixin from 'react-mixin'
import { gql, graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

const ROUND_TIME_LIMIT = 5 * 1000 // 5 seconds in milliseconds

// TODO: Remove:
/* eslint-disable no-console */

class Play extends Component {
  static navigationOptions = {
    title: '3 / 5',
    headerStyle: {
      backgroundColor: white
    },
    headerTintColor: darkBlue
  }

  componentDidMount = () => {
    // TODO: Do this only once apollo data is present.
    console.log(`You have ${ROUND_TIME_LIMIT / 1000} seconds!`)
    this.timeout = this.setTimeout(
      () => { console.log('Your time is up! YOU LOSE!') },
      ROUND_TIME_LIMIT
    )
  }

  onChoose = (word) => {
    clearTimeout(this.timeout)
    console.log('You chose: ' + word)
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
          onPress={() => this.onChoose('bear')}
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
        >
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>BEAR</Text>
        </Button>

        <Button
          block
          rounded
          onPress={() => this.onChoose('bare')}
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
        >
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>BARE</Text>
        </Button>

        <Button
          block
          rounded
          onPress={() => this.onChoose('bair')}
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

reactMixin(Play.prototype, TimerMixin)

const mapStateToProps = (state) => ({
  id: state.currentGame.id
})

const mapDispatchToProps = (dispatch) => ({
  // TODO select answer or run out of time
})

const query = gql`
  query CurrentGame ($id: ID!) {
    game(id: $id) {
      id
      isActive
      round {
        id
        giphyUrl
        wordSet {
          id
          words
        }
      }
    }
  }`

const queryOptions = {
  options: ({ id }) => ({
    variables: {
      id
    }
  })
}

const ConnectedComponent = compose(
  // graphql(query, queryOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Play)


export default ConnectedComponent

AppRegistry.registerComponent('Play', () => ConnectedComponent)
