import React,{useEffect,useState} from 'react';
import {Animated} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import RegisMember from './page/RegisMember'
import RegisHome from './page/RegisHome';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

export default Report = () => {

    const forFade = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
    });

    const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
        const progress = Animated.add(
          current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              })
            : 0
        );
      
        return {
          cardStyle: {
            transform: [
              {
                translateX: Animated.multiply(
                  progress.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [
                      screen.width, // Focused, but offscreen in the beginning
                      0, // Fully focused
                      screen.width * -0.3, // Fully unfocused
                    ],
                    extrapolate: 'clamp',
                  }),
                  inverted
                ),
              },
            ],
          },
        };
     };

    return (

        <Stack.Navigator initialRouteName="RegisMember" screenOptions={{gestureEnabled:true, headerShown: false }}>
            <Stack.Screen name="RegisMember" component={RegisMember}/>
            <Stack.Screen name="RegisHome" component={RegisHome} 
            options={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: forSlide
            }}/>
        </Stack.Navigator>
        
    );
};