import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginMember from './login/LoginMember';
import LoginVolunteer from './login/LoginVolunteer';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator();

export default LoginNavigation = () => {
  return (
      <Tab.Navigator screenOptions={{headerShown : false}}>
        <Tab.Screen name = {'Member'} component = {LoginMember} 
        options={{
          tabBarLabel: 'Member',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-alt" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name = {'Volunteer'} component = {LoginVolunteer}
        options={{
          tabBarLabel: 'Volunteer',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-nurse" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>
  );
};