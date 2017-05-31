import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'
import { Text, Spinner } from 'native-base'
import { lightBlue, darkBlue, orange, white } from '../colors'
import { gql, graphql } from 'react-apollo'

class Stats extends Component {
  static navigationOptions = {
    title: 'Stats',
    headerStyle: {
      backgroundColor: white
    },
    headerTintColor: darkBlue
  }

  render() {
    if (this.props.loading) {
      return (
        <Spinner />
      )
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ color: orange, fontWeight: 'bold', fontSize: 20 }}>All Games</Text>
          {this.props.games.map((game) => (
            <View key={game.id}>
              <Text>Game #{game.id}</Text>
              <Text style={{ color: darkBlue }}>Rounds:</Text>
              {game.rounds.map((round) => (
                <Text key={round.id}>{round.id}</Text>
              ))}
            </View>
          ))}
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
  }
})

Stats.propTypes = {
  loading: PropTypes.bool.isRequired,
  games: PropTypes.array
}

AppRegistry.registerComponent('Stats', () => Stats)

const queryOptions = {
  props: ({ data: { loading, games } }) => ({
    loading,
    games
  })
}

// TODO: Get games.roundsCount instead.
export default graphql(gql`
  query Stats {
    games {
      id
      isActive
      rounds {
        id
      }
    }
  }
`, queryOptions)(Stats)
