import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { cyberGrape, white, black, green, red } from '../utils/colors'
import SubmitButton from './SubmitButton'
import { getDeck } from './../utils/helpers'

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {
    
    const { deckTitle, deckId } = navigation.state.params
    return {
      title: 'Quiz',
      headerLeft: 
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={'arrow-back'} onPress={ () => { 
            
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
          <Icon name={'refresh'} onPress={ () => { 
            navigation.push('DeckDetails',
              { 
                deckId, 
                deckTitle,
              })
           }} />
          <Text style={{ color: white }}>Restart</Text>
        </View>
    }
  }

  state = {
    showAnswer: false,
    deckId: '',
    deckTitle: '',
    questionIndex: 0,
    correctRes: 0,
  }

  componentDidMount() {
    // TODO: Fetch deck from state by using Redux instead Asyncstorage
    const { deckId, deckTitle } = this.props.navigation.state.params
    getDeck(deckId).then((item) => (this.setState({
      deckId,
      deckTitle,
      deck: item,
      questionIndex: 0,
    })))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState
  }

  handleShowAnswer = () => {
    this.setState((prevState, props) => ({
      showAnswer: !prevState.showAnswer
    }))
  }

  handleResponseAnswer = (response) => {

    const { deck, questionIndex, correctRes, deckId, deckTitle } = this.state
    const res = response ? correctRes + 1 : correctRes

    if ((questionIndex + 1) < deck.questions.length) {
      // Not the last question yet
      this.setState({
        questionIndex: questionIndex + 1,
        correctRes: res,
        showAnswer: false
      })
    } else {
      this.props.navigation.push('Score',
        { 
          deckId, 
          deckTitle,
          correctRes: res,
          percentage: ((res * 100) / deck.questions.length).toFixed(1), 
        })
    }
  }

  render () {
    const { deck, showAnswer, questionIndex } = this.state
    console.log('questionIndex: ', questionIndex)
    if (deck) {
      console.log('deck: ', deck)
      if (deck.questions && deck.questions.length > 0) {
        const { questions } = deck
        console.log('questions: ', questions)
        return (
          <View style={styles.container}>
            <Text style={styles.counter}>
              {questionIndex+1}/{questions.length}
            </Text>
            {
              showAnswer === false &&
              <TouchableOpacity onPress={this.handleShowAnswer}>
                <Text style={styles.question}>
                  Q: {questions[questionIndex].question}
                </Text>
              </TouchableOpacity>
            }
            {
              showAnswer === true &&
              <TouchableOpacity onPress={this.handleShowAnswer}>
                <Text style={styles.answer}>
                  A: {questions[questionIndex].answer}
                </Text>
              </TouchableOpacity>
            }
            <SubmitButton 
              label='Correct'
              onPress={() => this.handleResponseAnswer(true)} 
              style={correctButtonStyles}
              />
            <SubmitButton 
              label='Incorrect'
              onPress={() => this.handleResponseAnswer(false)} 
              style={incorrectButtonStyles}
              />
          </View>
        )
      } else {
        return (
          <View style={styles.item}>
            <Text>
              Sorry! You can not take a quiz because there are no cards in the deck.
            </Text>
          </View>
        )
      }
    } else {
      return (
        <View style={styles.item}>
          <Text>
            Loading quiz ...
          </Text>
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
  counter: {
    color: black,
    fontSize: 20,
    textAlign: "left",
    marginBottom: 20
  },
  question: {
    color: black,
    fontSize: 20,
    textAlign: "center"
  },
  answer: {
    color: cyberGrape,
    fontSize: 16,
    textAlign: "center"
  },
})

const correctButtonStyles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  AndroidSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
})

const incorrectButtonStyles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  AndroidSubmitBtn: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
})


export default Quiz