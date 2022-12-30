import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from 'react-native-paper';
import { formatResult, Result } from '../utils';
import IconResult from './IconResult';

interface Props {
  attempt: Result;
  attemptNumber: number;
  hasWon: boolean;
  firstRow: boolean;
  wordleMode: boolean;
}

function AttemptRow({ attempt, attemptNumber, hasWon, firstRow = false, wordleMode = false }: Props) {
  const { colors } = useTheme();

  const style = {
    ...styles.attemptText,
    ...(firstRow ? styles.lastAttemptText : {}),
    ...(firstRow && hasWon ? { color: colors.primary } : {}),
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
    color: 'inherit',
  },
  attemptText: {
    color: '#363636',
    fontSize: 18,
  }
});

export default AttemptRow;
