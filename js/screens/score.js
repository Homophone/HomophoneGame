import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'
import { Text, Spinner, List, ListItem, Thumbnail } from 'native-base'
import { lightBlue, darkBlue, orange, white } from '../colors'
import { gql, graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

class Score extends Component {
  static navigationOptions = {
    title: 'Score',
    headerStyle: {
      backgroundColor: white
    },
    headerTintColor: darkBlue
  }

  render() {
    const { loading, game } = this.props

    if (loading) {
      return (
        <Spinner />
      )
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ color: orange, fontWeight: 'bold', fontSize: 20 }}>Final Score</Text>
          <Text>{game.rounds.length - 3} / {game.rounds.length}</Text>

          <List>
            {game.rounds.map((round) => (
              <ListItem key={round.id}>
                <Thumbnail square size={80} source={{ uri: round.giphyUrl }} />
                {round.isCorrect
                  ? <Icon name='check' style={styles.iconCorrect} />
                  : <Icon name='remove' style={styles.iconWrong} />}
                <Text>{round.correctAnswer}</Text>
              </ListItem>
            ))}
          </List>

        </View>
      </ScrollView>
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
  iconCorrect: {
    color: white,
    marginLeft: 10,
    marginRight: 5
  },
  iconWrong: {
    color: orange,
    marginLeft: 10,
    marginRight: 5
  }
})

Score.propTypes = {
  loading: PropTypes.bool.isRequired,
  game: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  rounds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    giphyUrl: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired
  }))
}

const mapStateToProps = (state) => ({
  gameId: state.currentGame.id
})

const queryOptions = {
  props: ({ data: { loading, game } }) => ({
    loading,
    game,
    rounds: game ? game.rounds : []
  })
}

const query = gql`
  query Score ($gameId: ID!) {
    game (id: $gameId) {
      id
      rounds {
        id
        giphyUrl
        correctAnswer
        isCorrect
      }
    }
  }
`

const ConnectedComponent = compose(
  connect(mapStateToProps),
  graphql(query, queryOptions)
)(Score)

export default ConnectedComponent

AppRegistry.registerComponent('Score', () => ConnectedComponent)
