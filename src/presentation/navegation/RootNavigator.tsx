import {HomeStack} from './homeStack';
import Home from '../page/home/home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RichTextPage from '../page/RichText/RichTextPage';
import ContactsPage from '../page/Contacts/ContactsPage';
import CallsPage from '../page/Calls/CallsPage';
import CalendarPage from '../page/Calendar/CalendarPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  // function HomeTab() {
  //   return (
  //     <NavigationContainer>
  //       <Tab.Navigator>
  //         <Tab.Screen name="Home" component={Home} />
  //       </Tab.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator> */}
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="Calendar"
          component={CalendarPage}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Calls"
          component={CallsPage}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Contacts"
          component={ContactsPage}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Rich Text"
          component={RichTextPage}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Home" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
