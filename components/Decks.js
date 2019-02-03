import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { getDecks } from './../utils/helpers'
import { white } from '../utils/colors'

class Decks extends Component {

  state = {
    deckList: []
  }

  componentDidMount() {
    getDecks().then((items) => {
      this.setState({
        deckList: items
      })
    })
  }

  deckItem = (deck) => {
    const { title, questions } = deck
    const key = Object.keys(deck)[0]
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(
        'DeckDetail',
        { deckId: key }
      )}>
        <Text>{title}</Text>
        <Text>{questions.length} Cards</Text>
      </TouchableOpacity>
    )
  }

  render () {
    const { deckList } = this.state

    if (deckList !== null && deckList.length > 0) {
      return (
        <View style={styles.item}>
          <Text>Decks</Text>
          <FlatList
            data={deckList}
            renderItem={({item}) => deckItem(item)}
          />
        </View>
      )
    }
    return (
      <View>
        <Text>There are no Decks! Come on, Let's create one!</Text>
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
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

export default Decks