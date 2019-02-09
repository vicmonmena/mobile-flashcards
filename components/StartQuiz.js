import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'

class StartQuiz extends Component {

  render () {
    const { deckId } = this.props.navigation.state.params
    return (
      <View style={styles.item}>
        <Text>
          Quiz for deck: {deckId}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

export default StartQuiz