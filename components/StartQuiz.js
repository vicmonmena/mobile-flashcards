import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/colors'

class StartQuiz extends Component {

  render () {
    const { title , error} = this.state
    return (
      <View style={styles.item}>
        <Text>
          Quiz for deck: {this.props.navigation.state.params.deckId}
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