import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { cyberGrape, white, black, silverChalice } from './../utils/colors'
import { getDeck } from './../utils/helpers'
import SubmitButton from './SubmitButton'

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

  goTo = (view) => {
    console.log('goTo: ', view)
    const { deckId } = this.props.navigation.state.params
    switch (view) {
      case 'addCard':
        console.log('goTo: ', view)
        this.props.navigation.push('AddCard',{ deckId: deckId })
        break;
      case 'startQuiz':
        console.log('goTo: ', view)
        this.props.navigation.push('StartQuiz',{ deckId: deckId })
        break;
    } 
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
            onPress={() => this.props.navigation.push('AddCard',{ deckId: deckId })} 
            style={addButtonStyles}
            />
            
          <SubmitButton 
            label='Start Quiz'
            onPress={() => this.props.navigation.push('StartQuiz',{ deckId: deckId })} 
            style={quizButtonStyles}
            />
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

export default DeckDetails