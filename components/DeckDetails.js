import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { cyberGrape, white, black, silverChalice } from './../utils/colors'
import { getDeck, removeDeck } from './../utils/helpers'
import SubmitButton from './SubmitButton'

class DeckDetails extends Component {
  
  static navigationOptions = ({ navigation }) => {
    
    const { deckTitle } = navigation.state.params
    return {
      title: deckTitle ? deckTitle : 'Error loading view',
      headerLeft: <Icon name={'arrow-back'} onPress={ () => { navigation.goBack() }} />
    }
  }

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

  handleDeleteDeck = () => {
    // TODO: show confirm modal
    console.log('handleDeleteDeck')
    const { deckId } = this.props.navigation.state.params
    this.props.navigation.goBack()
    removeDeck(deckId)
  }

  render () {
    const { deck } = this.state
    const { deckId } = this.props.navigation.state.params
    if (deck) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>{deck.questions ? deck.questions.length : 0} Cards</Text>
          <SubmitButton 
            label='Add Card'
            style={addButtonStyles}
            onPress={() => this.props.navigation.push('AddCard',{ 
              deckId: deckId, 
              deckTitle: deck.title 
              })}
            />
          <SubmitButton 
            label='Start Quiz'
            style={quizButtonStyles}
            onPress={() => this.props.navigation.push('Quiz',{ 
              deckId, 
              deckTitle: deck.title,
              })} 
            />
          <TouchableOpacity onPress={this.handleDeleteDeck}>
            <Text style={styles.delete}>Delete Deck</Text>
        </TouchableOpacity>
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
  title: {
    textAlign: "center",
    color: black,
    fontSize: 22,
  },
  subtitle: {
    textAlign: "center",
    color: silverChalice,
    fontSize: 16,
  },
  delete: {
    fontSize: 16,
    textAlign: "center",
    color: cyberGrape,
    fontWeight: 'bold',
    marginTop: 20
  }
})

const addButtonStyles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: cyberGrape,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  AndroidSubmitBtn: {
    backgroundColor: cyberGrape,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
})

const quizButtonStyles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  AndroidSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
})

export default DeckDetails