import React, { useState } from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from 'react-native'

import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'

import COLOR from '../constants/Colors'
import STYLES from '../constants/default-styles'

const StartGameScreen = props => {

    const [inputValue, setInputValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    
    const inputValidation = inputText => {
        setInputValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () =>{
        setInputValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const confirmedValue = parseInt(inputValue);
        if(isNaN(confirmedValue) || confirmedValue <= 0 || confirmedValue > 99){
            Alert.alert('Wrong number!', 'It is allowed only numbers between 0 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setSelectedNumber(confirmedValue);
        setConfirmed(true);
        setInputValue('');
        Keyboard.dismiss();
    }

    let confirmMessage;

    if(confirmed){
            confirmMessage =                 
            <Card style={styles.startGameContainer}>
                <Text style={STYLES.bodyText}>Selected number:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGameHandler(selectedNumber)} >Start Game</MainButton>
            </Card>
        }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={[styles.title, STYLES.bodyText]}>Start a New Game!</Text>
                <Card style={styles.inputArea}>
                    <Text style={STYLES.bodyText}>Select a number</Text>
                    <Input 
                        blurOnSubmit 
                        keyboardType="number-pad" 
                        maxLength={2} 
                        style={styles.input} 
                        onChangeText={inputText => inputValidation(inputText)}
                        value={inputValue}/>
                    <View style={styles.buttonsGroup}>
                        <View style={styles.button}><Button color={COLOR.accent} title="Reset" onPress={() => {resetInputHandler()}}/></View>
                        <View style={styles.button}><Button color={COLOR.primary} title="Confirm" onPress={() => {confirmInputHandler()}} /></View>
                    </View>
                </Card>
                {confirmMessage}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding: 10,
        alignItems: 'center',
    },
    buttonsGroup:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
        
    },
    button:{
        width: 100,
        padding: 5,
    },
    inputArea:{
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    input:{
        width: 50,
        textAlign: 'center',
    },
    startGameContainer:{
        alignItems: 'center',
        marginVertical: 10,
    }
})

export default StartGameScreen