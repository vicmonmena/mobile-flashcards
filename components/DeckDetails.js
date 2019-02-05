import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { teal, cyberGrape, white, black, silverChalice } from './../utils/colors'
import { getDeck } from './../utils/helpers'
import SubmitButton from './SubmitButton'
import AddCard from './AddCard'
import StartQuiz from './StartQuiz'

const DeckNavigator = createStackNavigator({
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      }
    }
  },
  StartQuiz: {
    screen: StartQuiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      }
    }
  }
})
const DeckNavigatorContainer = createAppContainer(DeckNavigator);
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
    const { deckId } = this.props.navigation.state.params
    switch (view) {
      case 'addCard':
        this.props.navigation.navigate('AddCard',{ deckId: deckId })
        break;
      case 'startQuiz':
        this.props.navigation.navigate('StartQuiz',{ deckId: deckId })
        break;
    } 
  }

  render () {
    const { deck } = this.state
    if (deck) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>{deck.questions ? deck.questions.length : 0} Cards</Text>
          <SubmitButton 
            label='Add Card'
            onPress={this.goTo('addCard')} 
            style={addButtonStyles}
            />
            
          <SubmitButton 
            label='Start Quiz'
            onPress={this.goTo('startQuiz')} 
            style={quizButtonStyles}
            />
          <DeckNavigatorContainer />
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