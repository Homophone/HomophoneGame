import React, { Component, PropTypes } from 'react'
import {
  Animated,
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native'
import { Button, Text } from 'native-base'
import { lightBlue, darkBlue, orange, burntOrange, white } from '../colors'
import TimerMixin from 'react-timer-mixin'
import reactMixin from 'react-mixin'
import { gql, graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { setCurrentRound } from '../actions'

import { debounce } from '../lib/utils'

const ROUND_TIME_LIMIT = 5 * 1000 // 5 seconds in milliseconds
const GET_READY_MIN_DURATION = 1 * 1000 // 1 seconds in milliseconds
const ROUND_ANIMATION_START = 0
const ROUND_ANIMATION_END = 100

class Play extends Component {
  static navigationOptions = {
    title: 'Play',
    headerStyle: {
      backgroundColor: white
    },
    headerTintColor: darkBlue
  }

  constructor(props) {
    super(props)
    this.state = {
      imageIsLoaded: false,
      surpassedGetReadyMinDuration: false,
      roundAnim: new Animated.Value(ROUND_ANIMATION_START)
    }
  }

  componentDidMount = () => {
    const { gameId } = this.props

    if (gameId) {
      this.newRound()
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { gameId: prevGameId, roundId: prevRoundId } = this.props
    const { gameId: nextGameId, roundId: nextRoundId } = nextProps

    if (!prevGameId && nextGameId) {
      this.newRound()
    }

    if (nextRoundId && prevRoundId !== nextRoundId) {
      this.startGetReadyTimer()
    }
  }

  newRound = () => {
    const { newRound, setCurrentRound } = this.props
    const { roundAnim } = this.state
    setCurrentRound(null)

    this.setState({
      imageIsLoaded: false
    })

    roundAnim.resetAnimation()
    Animated.timing(roundAnim, {
      toValue: ROUND_ANIMATION_END,
      duration: ROUND_TIME_LIMIT
    }).start()

    return newRound().then(({ data, data: { newRound } }) => {
      setCurrentRound(newRound.id)
      return data
    })
  }

  chooseWord = debounce((word) => {
    const { chooseWord } = this.props

    this.clearRoundLimitTimer()

    return chooseWord(word).then(({ data, data: { chooseWord } }) => {
      const { game: { isActive } } = chooseWord
      const { navigation: { navigate } } = this.props

      if (isActive) {
        return this.newRound().then(({ newRound }) => {
          this.props.refetch({ roundId: newRound.id })
        })
        .then(() => data)
      } else {
        // TODD: Show the game score screen.
        navigate('Score')
        return data
      }
    })
  })

  startGetReadyTimer = () => {
    this.setTimeout(() => {
      this.setState({
        surpassedGetReadyMinDuration: true
      })
    }, GET_READY_MIN_DURATION)
  }

  startRoundLimitTimer = () => {
    if (this.roundLimitTimer) {
      /* eslint-disable no-console */
      console.error('returning startRoundLimitTimer because this.roundLimitTimer is present')
      /* eslint-enable no-console */
      return
    }

    this.setState({
      imageIsLoaded: true
    })

    this.roundLimitTimer = this.setTimeout(
      () => {
        this.chooseWord(null)
      },
      ROUND_TIME_LIMIT
    )
  }

  clearRoundLimitTimer = () => {
    clearTimeout(this.roundLimitTimer)
    this.roundLimitTimer = undefined
  }

  onImageLoad = () => {
    this.startRoundLimitTimer()
  }

  onChoose = (word) => {
    this.clearRoundLimitTimer()
    this.chooseWord(word)
  }

  renderGetReadyOverlay = () => (
    <View style={styles.getReadyOverlay}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 52,
        color: white
      }}
      >
        GET READY!
      </Text>
      {this.props.game && (
        <View>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 42,
            color: white
          }}
          >
            You have
          </Text>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 52,
            color: white
          }}
          >
            {this.props.game.livesRemaining}
          </Text>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 42,
            color: white
          }}
          >
            {`${this.props.game.livesRemaining === 1 ? 'life' : 'lives'} left`}
          </Text>
        </View>
      )}
    </View>
  )

  render() {
    const { loading, gameId, roundId, round } = this.props

    if (loading || !gameId || !roundId) {
      return this.renderGetReadyOverlay()
    }

    const { imageIsLoaded, surpassedGetReadyMinDuration } = this.state

    return (
      <View style={styles.container}>

        {(!imageIsLoaded || !surpassedGetReadyMinDuration) && this.renderGetReadyOverlay()}

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: round.giphyUrl }}
            style={styles.image}
            resizeMode='contain'
            onLoad={this.onImageLoad}
          />
        </View>

        <View style={styles.progressContainer}>
          <Animated.View
            style={{
              height: '100%',
              backgroundColor: orange,
              borderRadius: 10,
              width: this.state.roundAnim.interpolate({
                inputRange: [ROUND_ANIMATION_START, ROUND_ANIMATION_END],
                outputRange: ['100%', '5%']
              })
            }}
          />
        </View>

        {round.wordSet.words.map((word) => (
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
    livesRemaining: PropTypes.number.isRequired
  }),
  round: PropTypes.shape({
    id: PropTypes.string.isRequired,
    giphyUrl: PropTypes.string,
    wordSet: PropTypes.shape({
      id: PropTypes.string.isRequired,
      words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    }).isRequired
  }),
  loading: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  refetch: PropTypes.func,
  newRound: PropTypes.func.isRequired,
  chooseWord: PropTypes.func.isRequired,
  setCurrentRound: PropTypes.func.isRequired,
  gameId: PropTypes.string,
  roundId: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightBlue,
    padding: 20
  },
  getReadyOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 99999,
    backgroundColor: lightBlue,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 328,
    height: 328
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
    backgroundColor: burntOrange,
    margin: 10,
    borderRadius: 10,
    transform: [{ rotate: '180deg' }] // Rope burn left to right.
  }
})

reactMixin(Play.prototype, TimerMixin)

const mapStateToProps = (state) => ({
  gameId: state.currentGame.id,
  roundId: state.currentGame.roundId
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentRound: (roundId) => {
    dispatch(setCurrentRound(roundId))
  }
  // TODO select answer or run out of time
})

const query = gql`
  query CurrentGameAndRound ($gameId: ID!, $roundId: ID!) {
    game (id: $gameId) {
      id
      isActive
      livesRemaining
    }
    round (id: $roundId) {
      id
      giphyUrl
      wordSet {
        id
        words
      }
    }
  }`

const queryOptions = ({
  options: ({ gameId, roundId }) => ({
    skip: !gameId || !roundId,
    variables: {
      gameId,
      roundId
    }
  }),
  props: ({ data: { loading, refetch, game, round } }) => ({
    loading,
    refetch,
    game,
    round
  })
})

const newRound = gql`
  mutation NewRound ($gameId: ID!) {
    newRound (gameId: $gameId) {
      id
      correctAnswer
      giphyUrl
      wordSet {
        id
        words
      }
      game {
        id
        livesRemaining
        isActive
      }
    }
  }`

const newRoundOptions = ({
  name: 'newRound',
  props: ({ ownProps, newRound }) => ({
    newRound: () => newRound({
      variables: {
        gameId: ownProps.gameId
      }
    })
  })
})

const chooseWord = gql`
  mutation ChooseWord ($roundId: ID!, $word: String) {
    chooseWord (roundId: $roundId, word: $word) {
      id
      correctAnswer
      selectedAnswer
      isCorrect
      game {
        id
        livesRemaining
        isActive
      }
    }
  }`

const chooseWordOptions = ({
  name: 'chooseWord',
  props: ({ ownProps, chooseWord }) => ({
    chooseWord: (word) => chooseWord({
      variables: {
        roundId: ownProps.roundId,
        word
      }
      // TODO: optimisticResponse in chooseWord mutation.
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   submitComment: {
      //     __typename: 'Comment',
      //     // Note that we can access the props of the container at `ownProps` if we
      //     // need that information to compute the optimistic response
      //     postedBy: ownProps.currentUser,
      //     createdAt: +new Date,
      //     content: commentContent
      //   }
      // }
    })
  })
})

const ConnectedComponent = compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(query, queryOptions),
  graphql(newRound, newRoundOptions),
  graphql(chooseWord, chooseWordOptions)
)(Play)

export default ConnectedComponent

AppRegistry.registerComponent('Play', () => ConnectedComponent)
