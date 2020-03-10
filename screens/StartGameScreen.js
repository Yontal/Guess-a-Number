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

import COLOR from '../constants/Colors'

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
                <Text>Selected number:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button color={COLOR.primary} title="Start game" onPress={() => props.onStartGameHandler(selectedNumber)} />
            </Card>
        }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputArea}>
                    <Text>Select a number</Text>
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