import { AsyncStorage } from 'react-native'
const MOBILE_FLASHCARDS_KEY = 'MobileFlashcards::decks'

/**
 * Return all of the decks along with their titles, questions, and answers. 
 *
 * @export
 * @returns
 */
export function getDecks () {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
}

/**
 * Take in a single id argument and return the deck associated with that id.
 *
 * @export
 * @param {*} id
 * @returns
 */
export function getDeck (id) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY).then((items) => {
    const data = JSON.parse(results)
    return data[id]
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
  return true
}

/**
 * Take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
 *
 * @export
 * @param {*} title
 * @param {*} card
 * @returns
 */
export function addCardToDeck (title, card) {
  return true
}