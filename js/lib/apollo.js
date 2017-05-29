import { ApolloClient, createNetworkInterface } from 'react-apollo'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://homophone-game-server.herokuapp.com/api/graphql'
  })
})

export default client
