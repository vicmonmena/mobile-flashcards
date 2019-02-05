import { AsyncStorage } from 'react-native'
const MOBILE_FLASHCARDS_KEY = 'MobileFlashcards::decks'

const getKeyFromTitle = (title) => {
  const keys = title.trim().split(' ').map(str => (
    str.charAt(0).toUpperCase()
  ))
  return keys.join('')
}

export const formatDate = (date) => {
  return date.getUTCFullYear() +"/"+ (date.getUTCMonth()+1) +"/"+ date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
}

export const clearAsyncStorage = () => {
  AsyncStorage.clear()
}

/**
 * Return all of the decks along with their titles, questions, and answers. 
 *
 * @export
 * @returns
 */
export function getDecks () {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((items) =>(JSON.parse(items)))
}

/**
 * Take in a single id argument and return the deck associated with that id.
 *
 * @export
 * @param {*} key
 * @returns
 */
export function getDeck (key) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((items) => {
      const data = JSON.parse(items)
      return data[key]
    })
}

/**
 * Take in a single title argument and add it to the decks.
 *
 * @export
 * @param {*} title
 * @returns
 */
export function saveDeckTitle (title) {
  console.log(title)
  return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_KEY, JSON.stringify({
    [getKeyFromTitle(title)]: {
      title,
      questions: [],
      timestamp: Date.now()
    }
  }))
}

/**
 * Take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
 *
 * @export
 * @param {*} key
 * @param {*} card
 * @returns
 */
export function addCardToDeck (key, card) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((items) => {
      const data = JSON.parse(items)
      card.timestamp = Date.now()
      data[key].questions.concat([card])
      AsyncStorage.setItem(MOBILE_FLASHCARDS_KEY, JSON.stringify(data))
    })
}

export function removeDeck (key) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(MOBILE_FLASHCARDS_KEY, JSON.stringify(data))
    })
}