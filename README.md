## About Mobile Flashcards

Mobile application for Android and iOS platforms that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

## How to run this project

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

## Folders

### `components`

All this project contents for UI

### `utils`

- `colors.js`: color names in RGB code
- `helpers.js`: AsyncStorage operations and other generic functions
- `components`: react components

## Notifications

This app checks if the user hasn't completed at least one quiz for that day and generate a notification to remind him/her that.