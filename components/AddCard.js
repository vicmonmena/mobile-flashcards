import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { white, cyberGrape, black } from '../utils/colors'
import { addCardToDeck } from './../utils/helpers'
import SubmitButton from './SubmitButton'
import InputText from './InputText'

class AddCard extends Component {

  state = {
    question: '',
    answer: '',
    error: false
  }

  handleChange = (text) => {
    this.setState({
      title: text
    })
  }

  submit = () => {
    const { question, answer } = this.state
    if (question !== '' && answer !== '') {
      // Bac to Deck View
      const card = {
        question,
        answer,
      }
      this.setState({ 
        question: '',
        answer: ''
      })
      const { deckId } = this.props.navigation.state.params
      this.props.navigation.dispatch(NavigationActions.back({key: 'AddCard'}))
      addCardToDeck(deckId, card)
    } else {
      
      this.setState({
        error: true
      })
    }
  }

  render () {
    const { question, answer, error} = this.state
    return (
      <View style={styles.item}>
        <InputText 
          onChange={this.handleChangeQuestion}
          value={question}
          name='question'
          placeholder='Question...'
        />
        <InputText 
          onChange={this.handleChangeAnswer}
          value={answer}
          name='answer'
          placeholder='Answer...'
        />
        <SubmitButton 
          label='SUBMIT'
          onPress={this.submit} 
          style={buttonStyles} 
        />
        { error &&
          <Text
            style={styles.error}>
            Please! Be sure you enter both, question and answer ...
          </Text>
        }
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
  error: {
    color: cyberGrape,
    textAlign: "center",
  },
})

const buttonStyles = StyleSheet.create({
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

export default AddCard