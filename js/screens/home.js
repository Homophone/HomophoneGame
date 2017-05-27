import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native'
import { Button, Text, Icon } from 'native-base'
import { lightBlue, darkBlue, white } from '../colors'

// redux test to be removed
import { connect } from 'react-redux'
import { add, subtract } from '../actions'

class Home extends Component {
  static navigationOptions = {
    title: 'Welcome',
    headerStyle: {
      backgroundColor: white
    },
    headerTintColor: darkBlue
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 46, color: white, fontWeight: 'bold', marginBottom: 30 }}>
          ho·mo·phone
        </Text>

        <Icon name='home' />

        <Button
          block
          rounded
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
          onPress={() => navigate('Play')}
        >
          <Text style={{ color: darkBlue, fontWeight: 'bold' }}>PLAY</Text>
        </Button>

        <Button
          block
          rounded
          style={{ backgroundColor: white, marginTop: 5, marginBottom: 5 }}
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
  onSubtract: PropTypes.func.isRequired
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

const mapStateToProps = (state) => ({
  value: state.counter.value
})

const mapDispatchToProps = (dispatch) => ({
  onAdd: () => {
    dispatch(add())
  },
  onSubtract: () => {
    dispatch(subtract())
  }
})

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default ConnectedComponent

AppRegistry.registerComponent('Home', () => ConnectedComponent)
