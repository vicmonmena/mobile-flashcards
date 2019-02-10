import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { white, cyberGrape } from '../utils/colors'
import { addCardToDeck } from './../utils/helpers'
import SubmitButton from './SubmitButton'
import InputText from './InputText'

class AddCard extends Component {

  static navigationOptions = ({ navigation }) => {
    
    const { deckTitle } = navigation.state.params
    return {
      title: 'Add Card',
      headerLeft: 
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon color={white} name={'arrow-back'} onPress={ () => { navigation.goBack() }} />
          <Text style={{ color: white }} >{deckTitle}</Text>
        </View>
    }
  }
  
  state = {
    question: '',
    answer: '',
    error: false
  }

  handleChangeQuestion = (text) => {
    this.setState({
      question: text
    })
  }

  handleChangeAnswer = (text) => {
    this.setState({
      answer: text
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
      addCardToDeck(deckId, card).then(() => {
        this.props.navigation.goBack()
      })
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
  }
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

export default AddCard