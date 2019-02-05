import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { white, cyberGrape } from '../utils/colors'
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
    if (this.state.title !== '') {
      // Bac to Deck View
      const title = this.state.title
      this.setState({ title: '' })
      this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
      saveDeckTitle(title)
    } else {
      
      this.setState({
        title: '',
        error: true
      })
    }
  }

  render () {
    const { title , error} = this.state
    return (
      <View style={styles.item}>
        <Text>What is the title of your new deck?</Text>
        <InputText 
          onChange={this.handleChange}
          value={title}
          name='new-deck'
          placeholder='Title...'
        />
        <SubmitButton onPress={this.submit} />
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
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  error: {
    color: cyberGrape
  }
})

export default AddDeck