import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import COLOR from '../constants/Colors'

const MainButton = props => {
    return(
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} >
            <View style={styles.button}>
                <Text style={styles.buttonText} >{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: COLOR.primary,
        borderRadius: 25,

    },
    buttonText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginHorizontal: 30,
        marginVertical: 15,
        color: 'white',
    }
})

export default MainButton;