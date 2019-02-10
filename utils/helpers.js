import { AsyncStorage, Alert } from 'react-native'
import { Notifications, Permissions } from 'expo'
const MOBILE_FLASHCARDS_KEY = 'MobileFlashcards::decks'
const NOTIFICATIONS_KEY = 'MobileFlashcards::notifications'

const getKeyFromTitle = (title) => {
  const keys = title.trim().split(' ').map(str => (
    str.charAt(0).toUpperCase() + str.substring(1)
  ))
  return keys.join('')
}

const checkTimestampIsToday = (timestamp) => {
  const today = new Date()
  const aDate = new Date(timestamp)
  if (today.getUTCFullYear() === aDate.getUTCFullYear() 
    && today.getUTCMonth() === aDate.getUTCMonth() 
    && today.getUTCDate() === aDate.getUTCDate())
    return true
  return false
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
 * Take in two arguments, key and card, and will add the card to the list of questions for the deck with the associated key.
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
      data[key].questions.push(card)
      console.log('data: ', data)
      AsyncStorage.setItem(MOBILE_FLASHCARDS_KEY, JSON.stringify(data))
    })
}

/**
 * Take in two arguments, key and card, and will add the score to the list the deck with the associated key.
 *
 * @export
 * @param {*} key
 * @param {*} score
 * @returns
 */
export function addScoreToDeck (key, score) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((items) => {
      const data = JSON.parse(items)
      data[key].quiz = {
        timestamp: Date.now(),
        score,
      }
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

/** *********** Notifications *********** **/

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

/**
 * Look for a quiz done today
 *
 * @export
 * @returns
 */
export function isTodayLastQuiz() {
  return getDecks().then((decks) => {
    if (decks) {
      const deckList = Object.keys(decks).map((key) => (Object.assign({}, decks[key], { key })))
      const quizFound = deckList.find(deck => (deck.quiz && checkTimestampIsToday(deck.quiz.timestamp)))
      console.log('quizFound: ', quizFound)
      if (quizFound) return true
      return false
    }
    return false
  })
}

/**
 * Notification config
 *
 */
function createNotification () {
  // Checking if user completed at least one quiz today
  return {
    title: 'Complete at least one quiz!',
    body: "Hey! Complete at least one quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export async function getNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    console.log('getNotificationPermission')
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

/**
 * Create a notification for in a minute to remind user must do a quiz
 *
 * @export
 */
export function setLocalNotification () {

  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
      .then((data) => {
        // Check if a notification is already created
        if (data === null) {
          console.log('setLocalNotification in 5 seconds')
          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            { time: (new Date()).getTime() + 5000 }
          )
          AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
        }
      })
}