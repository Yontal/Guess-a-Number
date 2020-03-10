import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>The game is over!</Text>
            <Text>Count of rounds: {props.countRounds}</Text>
            <Text>User number: {props.userChoice}</Text>
            <Button title="New game" onPress={props.configNewGame} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default GameOverScreen