import React, { useState , useMemo,useRef,useCallback} from 'react';
import { Avatar } from "./profile/avatar"
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

import {BottomSheetModal} from '@gorhom/bottom-sheet';
const testView = () => {

  const data = [
    {
      name: "อุบัติเหตุรถยนต์",
      population: 21500000,
      color: "gray",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

    return (
      <View>
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
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default testView;