import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

import MainButton from '../components/MainButton'

import STYLES from '../constants/default-styles'
import COROL from '../constants/Colors'

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text style={STYLES.titleText}>The game is over!</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/original.png')} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={STYLES.bodyText}>Your phone needed <Text style={styles.highlight}>{props.countRounds}</Text> to guess a number <Text style={styles.highlight}>{props.userChoice}</Text></Text>
            </View>
            <MainButton onPress={props.configNewGame} >New game</MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: '100%',
        height: '100%'
    },
    imageContainer:{
        width: 300,
        height: 300,
        borderRadius: 150,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'black',
        marginVertical: 30,
    },
    textContainer:{
        marginVertical: 15,
        marginHorizontal: 30,
    },
    highlight:{
        fontFamily: 'open-sans-bold',
        color: COROL.primary,
    }
})

export default GameOverScreen