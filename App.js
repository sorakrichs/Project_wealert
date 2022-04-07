import React,{useEffect,useState} from 'react';
import {View,Alert} from 'react-native';
import MapView from './componant/MapView'
import mapRegis from './componant/misc/mapRegis'
import LoginNavigation from './componant/LoginNavigation'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthProvider} from './providers/AuthProvider'
import {MapProvider} from './providers/MapProvider'
import {AlertProvider} from './providers/AlertProvider'
import {ReportProvider} from './providers/ReportProvider'

import statistic from './componant/statistic/statisticNavigation';
import memberProfile from './componant/profile/Profile';
import memberRegis from './componant/register/RegisMemberMain'
import volunteerRegis from './componant/register/RegisVolunteer'
import Report from './componant/report/Report';
import ValidateReport from './componant/report/ValidateReport';
import ViewReport from './componant/report/ViewReport'
import searchSceen from './componant/map/SearchSceen'
import OrganizeProfile from './componant/profile/OrganizeProfile'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Manual from './componant/manual/Manual'
const Stack = createStackNavigator();


export default App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <AuthProvider>
            <MapProvider>
            <AlertProvider>
              <Stack.Navigator initialRouteName="Map" screenOptions={{headerShown: false }}>
                <Stack.Group>
                  <Stack.Screen name="Map" component={MapView} />
                  <Stack.Screen name="Login" component={LoginNavigation} />
                  <Stack.Screen name="MemberRegis" component={memberRegis} />
                  <Stack.Screen name="VolunteerRegis" component={volunteerRegis} />
                  <Stack.Screen name="Profile" component={memberProfile} />
                  <Stack.Screen name="OrganizeProfile" component={OrganizeProfile} />
                  <Stack.Screen name="Test" component={statistic} />
                  <Stack.Screen name="MapRegis" component={mapRegis} />
                  <Stack.Screen name="Manual" component={Manual} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="Search" component={searchSceen} />
                    <Stack.Screen name="Report">
                      {(props) => {
                        const { navigation, route } = props;
                        return (
                          <ReportProvider>
                            <Report navigation={navigation} route={route} />
                          </ReportProvider>
                        );
                      }}
                    </Stack.Screen>
                    <Stack.Screen name="ValidateReport">
                      {(props) => {
                        const { navigation, route } = props;
                        return (
                          <ReportProvider>
                            <ValidateReport navigation={navigation} route={route} />
                          </ReportProvider>
                        );
                      }}
                    </Stack.Screen>
                    <Stack.Screen name="ViewReport">
                      {(props) => {
                        const { navigation, route } = props;
                        return (
                          <ReportProvider>
                            <ViewReport navigation={navigation} route={route} />
                          </ReportProvider>
                        );
                      }}
                    </Stack.Screen>
                </Stack.Group>
              </Stack.Navigator>
              </AlertProvider>
            </MapProvider>
          </AuthProvider>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};