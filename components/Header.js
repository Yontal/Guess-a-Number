import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import COLOR from '../constants/Colors'
import STYLES from '../constants/default-styles'

const Header = ({title}) => {
    return(
        <View style={styles.header}>
            <Text style={[styles.headerTitle, STYLES.titleText]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 90,
        backgroundColor: COLOR.primary,
    },
    headerTitle:{
        fontSize: 18,
        color: 'black',        
    }
})

export default Header