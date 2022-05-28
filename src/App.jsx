import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Headline, Modal, Portal, Snackbar, Switch, Text, TextInput, Title, useTheme } from 'react-native-paper';
import { formatResult, is4Digits, randomSecretNumber, randomSecretNumberWithoutRepeat, tryNumber } from './utils';

const MAX_DIGITS = 4;
const MAX_ATTEMPTS = 10;
const WELCOME_MESSAGE = '👇 Presioná el botón de abajo para jugar';

export default function App() {
  const { colors } = useTheme();
  const [attempts, setAttempts] = useState([]);
  const [lastAttempt, setLastAttempt] = useState(null);
  const [number, setNumber] = useState('');
  const [withRepeatedNumbers, setWithRepeatedNumbers] = useState(true);
  const [secretNumber, setSecretNumber] = useState('XXXX');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [message, setMessage] = useState(WELCOME_MESSAGE);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function onDismissSnackBar() {
    setSnackbarVisible(false);
  }

  function onAboutPress() {
    setSnackbarVisible(true);
  }

  function onDismissModal() {
    setModalVisible(false);
  }

  function onSettingsPress() {
    setModalVisible(true);
  }

  function handleNewNumber() {
    if(!is4Digits(number)) {
      return;
    }
    const result = tryNumber(number, secretNumber);
    setNumber('');
    const newAttemps = [...attempts, result];
    setAttempts(newAttemps);
    setLastAttempt(result);

    if(result.correct === MAX_DIGITS) {
      setIsPlaying(false);
      setHasWon(true);
      setMessage(`¡Genial, acertaste el número! 😄`);
    } else if(attempts.length + 1 === MAX_ATTEMPTS) {
      gameOver();
    }
  }

  function handleNewGame() {
    if(withRepeatedNumbers) {
      setSecretNumber(randomSecretNumber());
    } else {
      setSecretNumber(randomSecretNumberWithoutRepeat());
    }
    setMessage('Ingresá un nuevo número para adivinar el número secreto 🧐');
    setAttempts([]);
    setIsPlaying(true);
    setHasWon(false);
    setLastAttempt(null);
  }

  function gameOver() {
    setIsPlaying(false);
    setHasWon(false);
    setMessage(`El número era ${secretNumber} 😞`);
  }

  function handleToggleRepeatedNumbersSwitch() {
    setWithRepeatedNumbers(!withRepeatedNumbers);
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Numdle" subtitle="El Wordle de los números 🙌" />
        <Appbar.Action icon="cog" onPress={onSettingsPress} />
        <Appbar.Action icon="information" onPress={onAboutPress} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center'}}>
            <Title>Número {isPlaying ? 'XXXX' : secretNumber}</Title>
          </View>
          <View style={{ alignSelf: 'stretch'}}>
            <TextInput
              label="Número"
              placeholder='Ingresá un número y presioná ENTER 😬'
              mode='outlined'
              maxLength={MAX_DIGITS}
              value={number}
              onChangeText={setNumber}
              disabled={!isPlaying}
              onSubmitEditing={handleNewNumber}
              keyboardType="number-pad"
              blurOnSubmit={false}
            />
          </View>
          <View style={{ flexGrow: 1, marginTop: 10 }}>
            <Headline style={{ alignSelf: 'center' }}>Intentos</Headline>
            {attempts.slice(0, -1).map((attempt, i) => (
              <View
                key={i}
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
              >
                <Text style={styles.attemptText}>
                  #{String(i+1).padStart(2, '0')}
                </Text>
                <Text style={styles.attemptText}>
                  {attempt.number}
                </Text>
                <Text style={styles.attemptText}>
                  {formatResult(attempt)}
                </Text>
              </View>
            ))}
            {/* Last attempt has a different style */}
            {lastAttempt && (
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
              >
                <Text style={{...styles.lastAttemptText, color: hasWon ? 'teal' : colors.primary}}>
                  #{String(attempts.length).padStart(2, '0')}
                </Text>
                <Text style={{...styles.lastAttemptText, color: hasWon ? 'teal' : colors.primary}}>
                  {lastAttempt.number}
                </Text>
                <Text style={{...styles.lastAttemptText, color: hasWon ? 'teal' : colors.primary}}>
                  {formatResult(lastAttempt)}
                </Text>
              </View>
            )}
          </View>
          <View style={{ alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ textAlign: 'center' }}>{message}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Button
              mode="contained"
              disabled={isPlaying}
              onPress={handleNewGame}
              style={{ marginBottom: 10 }}
            >
              Jugar
            </Button>
            <Button
              mode="contained"
              disabled={!isPlaying}
              onPress={gameOver}
            >
              Finalizar
            </Button>
          </View>
        </View>
        <StatusBar style="auto" />
        <Portal>
          <Modal visible={modalVisible} onDismiss={onDismissModal} contentContainerStyle={styles.modal}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text>Permitir dígitos repetidos</Text>
              <Switch
                value={withRepeatedNumbers}
                onValueChange={handleToggleRepeatedNumbersSwitch}
                disabled={isPlaying}
              />
            </View>

          </Modal>
        </Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
        >
          Hecho con ❤️ por el grupo 6 para la materia Aplicaciones Distribuídas de la UADE
        </Snackbar>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  lastAttemptText: {
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 20,
  },
  hasWonText: {
    textShadowColor: 'teal',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  attemptText: {
    color: '#363636',
    fontSize: 18,
  }
});
