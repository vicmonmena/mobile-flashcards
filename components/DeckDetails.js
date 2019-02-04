import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { white } from '../utils/colors'
import { getDeck } from './../utils/helpers'

class DeckDetails extends Component {

  state = {
    deck: undefined
  }

  componentDidMount() {
    // TODO: Fetch deck from state by using Redux instead Asyncstorage
    const { deckId } = this.props.navigation.state.params
    getDeck(deckId).then((item) => (this.setState({
      deck: item
    })))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.deck !== nextState.deck
  }

  render () {
    const { deckId } = this.props.navigation.state.params
    const { deck } = this.state
    if (deck) {
      return (
        <View style={styles.container}>
          <Text>{deck.title}</Text>
          <Text>{deck.questions ? deck.questions.length : 0} Cards</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading ...</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

export default DeckDetails