import React from 'react';
import { 
  StyleSheet, 
  StatusBar, 
  View, 
  Platform
} from 'react-native';
import { 
  createAppContainer, 
  createBottomTabNavigator, 
  createStackNavigator 
} from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { teal, white } from './utils/colors'
import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import Score from './components/Score'
import { 
  setLocalNotification, 
  isTodayLastQuiz, 
  getNotificationPermission
} from './utils/helpers'

/**
 * Custom status bar
 *
 * @param {*} {backgroundColor, ...props}
 * @returns
 */
function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

/**
 * Allows to navigate between Tabs options
 */
const Tabs = createAppContainer(createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? teal : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : teal,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}))

/**
 * Allows to navigate from Deck list to a Deck detail pressing on it.
 */
const DeckNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  Score: {
    screen: Score,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
})

const DeckNavigatorContainer = createAppContainer(DeckNavigator);

export default class App extends React.Component {

  componentWillMount() {
    getNotificationPermission()
  }

  componentDidMount() {
    isTodayLastQuiz().then((isToday) => {
      if (!isToday) {
        setLocalNotification()
      }
    })
    
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomStatusBar backgroundColor={teal} barStyle="light-content" />
        <DeckNavigatorContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
