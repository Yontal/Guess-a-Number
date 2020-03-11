import React, { useState, useRef, useEffect } from 'react'
import {View, Text, StyleSheet, Button, Alert , ScrollView, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'

import COLOR from '../constants/Colors'
import STYLES from '../constants/default-styles'

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

const renderItemList = (item, round) => (
    <View style={styles.listItem}>
        <Text styles={STYLES.bodyText}>Round # {item - round.index}</Text>
        <Text style={STYLES.bodyText}>Guess: {round.item}</Text>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 99, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [rounds, setRounds] = useState([initialGuess]);
    const currentMin = useRef(1);
    const currentMax = useRef(99);

    const { onGameOver, userChoice } = props;

    useEffect(() =>{
        if(currentGuess === userChoice){
            onGameOver(rounds.length);
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
            currentMax.current = currentGuess -1;
        }
        else if (direction === 'greater'){
            currentMin.current = currentGuess + 1;
        }
        const nextGuess = generateRandomBetween(currentMin.current, currentMax.current, currentGuess)
        setCurrentGuess(nextGuess);
        setRounds(prevRounds => [nextGuess, ...prevRounds])
    }

    return(
        <View style={styles.screen}>
            <Text style={STYLES.bodyText}>Opponent`s guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonsGroup}>
                <View><MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton></View>
                <View><MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton></View>
            </Card>
            <FlatList 
                data={rounds}
                renderItem={renderItemList.bind(this, rounds.length)}
                keyExtractor={item => item.toString()}
                contentContainerStyle={styles.list}
            />
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
    },
    listItem:{
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between',
        width: 300,
    },
    list: {
        justifyContent: 'flex-end',
        flexGrow: 1,
    }

})

export default GameScreen