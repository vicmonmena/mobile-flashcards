import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { white, teal } from './../utils/colors'
import { addScoreToDeck } from './../utils/helpers'

class DeckDetails extends Component {
  
  static navigationOptions = ({ navigation }) => {
    
    const { deckId, deckTitle, correctRes } = navigation.state.params
    return {
      title: 'Your Score',
      headerLeft: 
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon color={white} name={'arrow-back'} onPress={ () => { 
            navigation.push('Quiz',
              { 
                deckId, 
                deckTitle,
              })
          }} />
          <Text style={{ color: white }} >{deckTitle}</Text>
        </View>,
      headerRight:
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: white }}>Finish</Text>
          <Icon color={white} name={'refresh'} onPress={ () => { 
            navigation.navigate('Decks', {})
            addScoreToDeck(deckId, correctRes)
           }} />
        </View>
    }
  }

  render () {
    const { correctRes, percentage } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Text style={styles.title}> {correctRes} correct questions answered ({percentage}%)</Text>
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
  title: {
    textAlign: "center",
    color: teal,
    fontSize: 22,
  },
})

export default DeckDetails