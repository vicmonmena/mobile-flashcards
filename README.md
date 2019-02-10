## About Mobile Flashcards

Mobile application for Android and iOS platforms that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

This project has been build using `React` and `React Native` (not Redux used).

## How to run this project

### First of all

Download dependencies (node_modules)

In a command line/terminal execute:

```
yarn install
```

or 

```
npm install
```

### Once dependencies are downloaded

In a command line/terminal execute:

```
yarn start
```

or 

```
npm start
```

## This project data structure

### Decks

```javascript
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
        timestamp: 1495255666921
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
        timestamp: 1495255666921
      }
    ],
    quiz: {
      score: 3,
      timestamp: 1495255666921
    }
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
        timestamp: 1495255666921
      }
    ],
    quiz: {
      score: 3,
      timestamp: 1495255666921
    }
  }
}
```

### Questions
```javascript
{
  question: 'What is React?',
  answer: 'A library for managing user interfaces'
},
```

### Quiz

```javascript
{
  score: 3,
      timestamp: 1495255666921
},
```

- A `quiz` is added to Deck when the user finished the quiz and he/she press `Restart` button on the right side of the header bar.

## Folders

### `components`

All this project contents for UI

### `utils`

- `colors.js`: color names in RGB code
- `helpers.js`: AsyncStorage operations and other generic functions
- `components`: react components

## Notifications

This app checks if the user hasn't completed at least one quiz for that day and generate a notification to remind him/her that.

## Extra modules

For feature `Delete Deck` on `DeckDetails` screen, `react-native-elements` has been import used to build a modal to confirm/cancel deletion. It is motivated by a bug found using Alert/AlertiOS from `react-native` module whick block the UI when the Alert is shown.