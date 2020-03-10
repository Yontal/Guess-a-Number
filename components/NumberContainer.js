import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import COLOR from '../constants/Colors'

const NumberContainer = props => {
    return(
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
        borderColor: COLOR.accent,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    number:{
        fontSize: 22,
        color: COLOR.accent,
    }
})

export default NumberContainer