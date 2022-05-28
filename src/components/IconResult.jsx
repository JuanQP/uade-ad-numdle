import React from 'react';
import { StyleSheet, View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { ALMOST_EMOJI, OK_EMOJI } from '../utils';

function formatColor(character) {
  if(character === OK_EMOJI) return 'green';
  if(character === ALMOST_EMOJI) return 'gold';
  return 'gray';
}

function IconResult({ attempt, firstRow }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Avatar.Icon size={firstRow ? 35 : 25} style={styles.icon} icon="square" color={formatColor(attempt.emoji.charAt(0))} />
      <Avatar.Icon size={firstRow ? 35 : 25} style={styles.icon} icon="square" color={formatColor(attempt.emoji.charAt(1))} />
      <Avatar.Icon size={firstRow ? 35 : 25} style={styles.icon} icon="square" color={formatColor(attempt.emoji.charAt(2))} />
      <Avatar.Icon size={firstRow ? 35 : 25} style={styles.icon} icon="square" color={formatColor(attempt.emoji.charAt(3))} />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
});

export default IconResult;
