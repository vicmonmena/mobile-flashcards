import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native'
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements'
import { cyberGrape, white, black, silverChalice, red, green } from './../utils/colors'
import { getDeck, removeDeck } from './../utils/helpers'
import SubmitButton from './SubmitButton'

class DeckDetails extends Component {
  
  static navigationOptions = ({ navigation }) => {
    
    const { deckTitle } = navigation.state.params
    return {
      title: deckTitle ? deckTitle : 'Error loading view',
      headerLeft: <Icon color={white} name={'arrow-back'} onPress={ () => { navigation.goBack() }} />
    }
  }

  state = {
    deck: undefined,
    isModalVisible: false
  }

  componentDidMount() {
    // TODO: Fetch deck from state by using Redux instead Asyncstorage
    console.log('componentDidMount')
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        console.log('willFocus')
        this.fetchDeck()
      }
    );
  }

  fetchDeck = () => {
    const { deckId } = this.props.navigation.state.params
    getDeck(deckId).then((item) => {
      console.log('item: ', item)
      console.log('item.questions.length: ', item.questions.length)
      this.setState({
        deck: item
      })
    })
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })

  confirmDeleteDeck = () => {
    // TODO: show confirm modal
    const { deckId } = this.props.navigation.state.params
    removeDeck(deckId).then(() => {
      this.props.navigation.goBack()
    })
  }

  render () {
    const { deck, isModalVisible } = this.state
    const { deckId } = this.props.navigation.state.params
    if (deck) {
      return (
        <View style={styles.container}>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.modal}>
              <Text style={styles.title} >Are you sure you want to delete this Deck? Take into account all of his cards will be deleted too</Text>
              <View style={{ flexDirection: 'row' }}>
                <SubmitButton 
                  label='YES'
                  style={confirmButtonStyles}
                  onPress={this.confirmDeleteDeck}
                  />
                <SubmitButton 
                label='NO'
                style={cancelButtonStyles}
                onPress={this._toggleModal}
                />
              </View>
            </View>
          </Modal>
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
          <TouchableOpacity onPress={this._toggleModal}>
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
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: silverChalice,
    maxHeight: 200,
    padding: 10,
    borderRadius: 2,
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

const confirmButtonStyles = StyleSheet.create({
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

const cancelButtonStyles = StyleSheet.create({
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

export default DeckDetails