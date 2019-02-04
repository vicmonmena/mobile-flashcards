import React, { Component } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { getDecks } from './../utils/helpers'
import { white } from '../utils/colors'

class Decks extends Component {

  state = {
    deckList: []
  }

  componentDidMount() {
    getDecks().then((items) => {
      // console.log('items: ', items)
      const deckList = Object.keys(items).map((key) => (Object.assign({}, items[key], { key })))
      this.setState({
        deckList
      })
    })
  }

  deckItem = (deck) => {
    console.log(deck)
    const { title, questions, key } = deck
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(
          'DeckDetails',
          { deckId: key }
        )}>
          <Text>{title}</Text>
          <Text>{questions ? questions.length : 0} Cards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const { deckList } = this.state
    console.log('deckList: ', deckList)
    if (deckList && deckList.length > 0) {
      return (
        <View style={styles.container} >
          <FlatList
            data={deckList}
            renderItem={({item}) => this.deckItem(item)}
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

export default Decks