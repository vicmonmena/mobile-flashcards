import React, { Component } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  Button
} from 'react-native'
import { AppLoading } from 'expo'
import { withNavigationFocus } from 'react-navigation'
import { getDecks, clearAsyncStorage } from './../utils/helpers'
import { white } from '../utils/colors'

class Decks extends Component {

  state = {
    deckList: [],
    ready: false
  }

  componentDidMount() {
    this.fetchDecks()
    this.props.navigation.addListener('didFocus', () => {
      console.log('fetchDecks')
      this.fetchDecks()
    })
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.deck !== nextState.deck
  }

  clearAsyncStorage = async() => {
    clearAsyncStorage();
  }

  /**
   * Get decks from Asyncstorage
   *
   * @memberof Decks
   */
  fetchDecks = () => {
    getDecks().then((items) => {
      if (items) {
        // console.log('items: ', items)
        const deckList = Object.keys(items).map((key) => (Object.assign({}, items[key], { key })))
        // const sortedList = deckList.sort((deckA,deckB) => deckB.timestamp - deckA.timestamp)
        this.setState({
          ready: true,
          deckList
        })
      } else {
        this.setState({
          ready: true,
          deckList: []
        })
      }

    })
  }
  
  deckItem = (deck) => {
    const { title, questions, key, timestamp } = deck
    const date = new Date(timestamp)
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetails',
          { deckId: key }
        )}>
          <Text>{title}</Text>
          <Text>{questions ? questions.length : 0} Cards</Text>
          <Text>Created at: {date.toISOString()} Cards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const { deckList, ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    if (deckList && deckList.length > 0) {
      return (
        <View style={styles.container} >
          <Button onPress={this.clearAsyncStorage} title='Clear Async Storage' />
          <FlatList
            data={deckList}
            renderItem={({item}) => this.deckItem(item, this.fetchDecks)}
          />
        </View>
      )
    }
    return (
      <View>
        <Text>There are no Decks! C'mon, Let's create one!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    overflow: 'hidden'
  },
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
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

export default withNavigationFocus(Decks)