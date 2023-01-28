import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../screens/Login.js'
import LandingPage from '../screens/LandingPage.js'

export default function Navbar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Login}/>
      <Tab.Screen name="Settings" component={LandingPage}/>
    </Tab.Navigator>
  );
}