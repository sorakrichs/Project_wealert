import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import reportStatistic from './page/reportStatistic';
import provinceStatistic from './page/provinceStatistic';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator();

export default statisticNavigation = () => {
  return (
      <Tab.Navigator screenOptions={{headerShown : false}}>
        <Tab.Screen name = {'Disaster'} component = {reportStatistic} 
        options={{
          tabBarLabel: 'Member',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-alt" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name = {'Province'} component = {provinceStatistic}
        options={{
          tabBarLabel: 'Volunteer',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-nurse" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>
  );
};