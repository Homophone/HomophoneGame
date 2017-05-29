import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native'
import { Button, Text } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { lightBlue, darkBlue, white } from '../colors'
import { debounce } from '../lib/utils'

import { gql, graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { add, subtract, clearCurrentGame, setCurrentGame } from '../actions'

class Home extends Component {
  static navigationOptions = {
    title: 'Welcome',
    headerStyle: {
      backgroundColor: white
    },
    headerTintColor: darkBlue
  }

  componentDidMount = () => {
    this.props.clearCurrentGame()
  }

  onPressNewGame = debounce(() => {
    const { navigate } = this.props.navigation

    this.props.mutate()
    .then(({ data: { startNewGame: { id } } }) => {
      this.props.setCurrentGame(id)
      navigate('Play')
    })
  })

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 46, color: white, fontWeight: 'bold', marginBottom: 30 }}>
          ho·mo·phone
        </Text>

        <View style={styles.iconContainer}>
          <Icon name='hand-peace-o' style={styles.icon} />
          <Icon name='puzzle-piece' style={styles.icon} />
        </View>

        <Button
          block
          rounded
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
          onPress={this.onPressNewGame}
        >
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>PLAY</Text>
        </Button>

        <Button
          block
          rounded
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
          onPress={() => navigate('Stats')}
        >
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>STATS</Text>
        </Button>

        <Button
          block
          rounded
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
        >
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>LEADERBOARD</Text>
        </Button>

        <Text>{ this.props.value }</Text>
        <Button
          onPress={this.props.onAdd}
        >
          <Text>Add</Text>
        </Button>
        <Button
          onPress={this.props.onSubtract}
        >
          <Text>Subtract</Text>
        </Button>
      </View>
    )
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onSubtract: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  setCurrentGame: PropTypes.func.isRequired,
  clearCurrentGame: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightBlue,
    padding: 20
  },
  iconContainer: {
    flexDirection: 'row'
  },
  icon: {
    fontSize: 60,
    color: darkBlue,
    marginRight: 10
  }
})

const mapStateToProps = (state) => ({
  value: state.counter.value
})

const mapDispatchToProps = (dispatch) => ({
  onAdd: () => {
    dispatch(add())
  },
  onSubtract: () => {
    dispatch(subtract())
  },
  setCurrentGame: (id) => {
    dispatch(setCurrentGame(id))
  },
  clearCurrentGame: () => {
    dispatch(clearCurrentGame())
  }
})

const mutation = gql`
  mutation StartNewGame {
    startNewGame {
      id
    }
  }`

const mutationOptions = {
  options: {
    refetchQueries: [
      'Stats'
    ]
  }
}

const ConnectedComponent = compose(
  graphql(mutation, mutationOptions),
  connect(mapStateToProps, mapDispatchToProps)
)(Home)

export default ConnectedComponent

AppRegistry.registerComponent('Home', () => ConnectedComponent)
