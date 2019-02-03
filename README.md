## About Mobile Flashcards

Mobile application that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

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
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
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

## Notes