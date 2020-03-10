import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {

  const [userChoice, setUserChoice] = useState();
  const [countRounds, setCountRounds] = useState(0);
  const [appLoaded, setAppLoaded] = useState(false);

  if(!appLoaded){
    return(
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setAppLoaded(true)}
        onError={err => console.log(err)}/>
    );
  }

  const onStartGameHandler = (selectedNumber) => {
    setUserChoice(selectedNumber);
  }

  const configNewGame = () => {
    setCountRounds(0);
    setUserChoice(null);
  }

  const onGameOverHandler = (rounds) => {
    setCountRounds(rounds);
  }

 let content = (<StartGameScreen onStartGameHandler={onStartGameHandler} />);
  if(userChoice && countRounds <=0 ){
    content = (<GameScreen userChoice={userChoice} onGameOver={onGameOverHandler} />);
  }

  if(countRounds > 0){
    content = (<GameOverScreen
                countRounds={countRounds}
                userChoice={userChoice}
                configNewGame={configNewGame} />);
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
  }
});