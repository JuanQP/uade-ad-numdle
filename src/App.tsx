import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Headline, Modal, Portal, Snackbar, Switch, Text, TextInput, Title } from 'react-native-paper';
import AttemptRow from './components/AttemptRow';
import { is4Digits, randomSecretNumber, randomSecretNumberWithoutRepeat, Result, tryNumber } from './utils';

const MAX_DIGITS = 4;
const MAX_ATTEMPTS = 10;
const WELCOME_MESSAGE = '👇 Presioná el botón de abajo para jugar';

export default function App() {
  const [attempts, setAttempts] = useState<Result[]>([]);
  const [number, setNumber] = useState('');
  const [withRepeatedNumbers, setWithRepeatedNumbers] = useState(true);
  const [secretNumber, setSecretNumber] = useState('XXXX');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [message, setMessage] = useState(WELCOME_MESSAGE);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [wordleMode, setWordleMode] = useState(false);

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
    const newAttemps = [result, ...attempts];
    setAttempts(newAttemps);

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
  }

  function gameOver() {
    setIsPlaying(false);
    setHasWon(false);
    setMessage(`El número era ${secretNumber} 😞`);
  }

  function handleToggleRepeatedNumbersSwitch() {
    setWithRepeatedNumbers(!withRepeatedNumbers);
  }

  function handleToggleWordleModeSwitch() {
    setWordleMode(!wordleMode);
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
            {attempts.map((attempt, i) => (
              <AttemptRow
                key={i}
                attemptNumber={attempts.length - i}
                attempt={attempt}
                wordleMode={wordleMode}
                hasWon={hasWon}
                firstRow={i === 0}
              />
            ))}
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text>Modo Wordle</Text>
              <Switch
                value={wordleMode}
                onValueChange={handleToggleWordleModeSwitch}
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
});
