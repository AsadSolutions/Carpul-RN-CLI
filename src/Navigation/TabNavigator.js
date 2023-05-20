import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#B3B3B3',
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 22 : 0,
          left: 10,
          right: 10,
          elevation: 0,
          borderRadius: 25,
          backgroundColor: 'white',
          height: Platform.OS === 'ios' ? 60 : 70,
          paddingBottom: Platform.OS === 'ios' ? 0 : 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarStyle: {
            backgroundColor: 'white',
          },
          tabBarIcon: ({color}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'ios' ? 5 : 0,
              }}>
              <Ionicons name="home" size={25} color={color} />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'ios' ? 5 : 0,
              }}>
              <AntDesign name="message1" size={25} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: Platform.OS === 'ios' ? 5 : 0,
              }}>
              <AntDesign name="user" size={25} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
