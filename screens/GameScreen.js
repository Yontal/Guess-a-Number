import React, { useState, useRef, useEffect } from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'

import COLOR from '../constants/Colors'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum == exclude){
        return generateRandomBetween(min, max, exclude)
    }
    else{
        return rndNum;
    }
}

const GameScreen = props => {

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 99, props.userChoice));
    const [rounds, setCountRounds] = useState(0);
    const currentMin = useRef(1);
    const currentMax = useRef(99);

    const { onGameOver, userChoice } = props;

    useEffect(() =>{
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    },[userChoice, currentGuess, onGameOver]);

    const nextGuessHandler = direction => {
        if(
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice)
            ){
            Alert.alert('Don\'t lie!', 'You know that it is wrong',[{text: 'Sorry', style: 'cancel'}]);
            return;
        }
        if(direction === 'lower'){
            currentMax.current = currentGuess;
        }
        else if (direction === 'greater'){
            currentMin.current = currentGuess;
        }
        setCurrentGuess(generateRandomBetween(currentMin.current, currentMax.current, currentGuess));
        setCountRounds(rounds => rounds + 1)
    }

    return(
        <View style={styles.screen}>
            <Text>Opponent`s guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonsGroup}>
                <View><Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} /></View>
                <View><Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} /></View>
            </Card>
        </View>
    );

}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonsGroup:{
        flexDirection: 'row',
        alignContent: 'space-between',
        marginVertical: 20,
        justifyContent: 'space-around',
        width: 300,
        maxWidth: '80%',
    }

})

export default GameScreen