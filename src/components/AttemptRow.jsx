import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text, useTheme, } from 'react-native-paper';
import { formatResult } from '../utils';
import IconResult from './IconResult';

function AttemptRow({ attempt, attemptNumber, hasWon, firstRow = false, wordleMode = false }) {
  const { colors } = useTheme();
  let style = styles.attemptText;
  if(firstRow) {
    style = styles.lastAttemptText;
    if(hasWon) {
      style = { ...style, color: colors.primary };
    }
  }
  return (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}
    >
      <Text style={style}>
        #{String(attemptNumber).padStart(2, '0')}
      </Text>
      <Text style={style}>
        {attempt.number}
      </Text>
      <Text style={style}>
        {wordleMode ? <IconResult attempt={attempt} firstRow={firstRow} /> : formatResult(attempt)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lastAttemptText: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 20,
  },
  attemptText: {
    color: '#363636',
    fontSize: 18,
  }
});

export default AttemptRow;
