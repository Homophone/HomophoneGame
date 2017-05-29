import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native'
import { Button, Text, Spinner } from 'native-base'
import { lightBlue, darkBlue, orange, white } from '../colors'
import TimerMixin from 'react-timer-mixin'
import reactMixin from 'react-mixin'
import { gql, graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import { debounce } from '../lib/utils'

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
    const { game } = this.props

    if (game) {
      this.startCountdown()
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { game: prevGame } = this.props
    const { game: nextGame } = nextProps

    if (!prevGame && nextGame) {
      this.startCountdown()
    }
  }

  startCountdown = () => {
    if (this.timeout) {
      return
    }
    console.log(`You have ${ROUND_TIME_LIMIT / 1000} seconds!`)
    this.timeout = this.setTimeout(
      () => { console.log('Your time is up! YOU LOSE!') },
      ROUND_TIME_LIMIT
    )
  }

  onChoose = debounce((word) => {
    clearTimeout(this.timeout)
    this.timeout = undefined
    console.log('You chose: ' + word)
  })

  render() {
    const { loading, game, id } = this.props

    if (loading || !id) {
      return (
        <Spinner />
      )
    }

    const { rounds } = game
    const currentRound = rounds[rounds.length - 1]

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentRound.giphyUrl }}
            style={styles.image}
          />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progress} />
        </View>

        {currentRound.wordSet.words.map((word) => (
          <Button
            key={word}
            block
            rounded
            onPress={() => this.onChoose(word)}
            style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
          >
            <Text style={{ color: darkBlue, fontWeight: 'bold' }}>{word}</Text>
          </Button>
        ))}
      </View>
    )
  }
}

Play.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    rounds: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      giphyUrl: PropTypes.string,
      wordSet: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
      }).isRequired).isRequired
    }).isRequired).isRequired
  }),
  loading: PropTypes.bool.isRequired,
  id: PropTypes.string
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
      rounds {
        id
        giphyUrl
        wordSet {
          id
          words
        }
      }
    }
  }`

const queryOptions = ({
  options: ({ id }) => ({
    skip: !id,
    variables: {
      id
    }
  }),
  props: ({ data, data: { loading, game } }) => ({
    loading,
    game
  })
})

const ConnectedComponent = compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(query, queryOptions)
)(Play)

export default ConnectedComponent

AppRegistry.registerComponent('Play', () => ConnectedComponent)
