import React, { useState , useMemo,useRef,useCallback} from 'react';
import {
    View,
    Text,
    NativeModules,
    LayoutAnimation,
    Pressable,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert
    } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import Header from '../../subComponant/Header'
import {BottomSheetModal} from '@gorhom/bottom-sheet';
const testView = ({navigation}) => {

  const data = [
    {
      name: "อุบัติเหตุรถยนต์",
      population: 1,
      color: "gray",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
        name: "น้ำท่วม",
        population: 1,
        color: "gray",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
  ];

    return (
      <View style={styles.container}>
        <Header
            navigation={navigation}
            title = {'สมาชิก'}
            color = {'chocolate'}
        />  
      <Text>Bezier Line Chart</Text>
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#66FFCC',
    },
});

export default testView;