import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { white, cyberGrape, black } from '../utils/colors'
import { saveDeckTitle } from './../utils/helpers'
import SubmitButton from './SubmitButton'
import InputText from './InputText'

class AddDeck extends Component {

  state = {
    title: '',
    error: false
  }

  handleChange = (text) => {
    this.setState({
      title: text
    })
  }

  submit = () => {
    const { title } = this.state
    if (title !== '') {
      this.setState({ title: '' })
      this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
      saveDeckTitle(title)
    } else {
      this.setState({ error: true })
    }
  }

  render () {
    const { title, error} = this.state
    return (
      <View style={styles.item}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <InputText 
          onChange={this.handleChange}
          value={title}
          name='new-deck'
          placeholder='Title...'
        />
        <SubmitButton 
          label='SUBMIT'
          onPress={this.submit} 
          style={buttonStyles} 
        />
        { error &&
          <Text
            style={styles.error}>
            Please! Be sure you enter the title ...
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
  title: {
    textAlign: "center",
    color: black,
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
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

export default AddDeck