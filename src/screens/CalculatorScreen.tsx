import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const CalculatorScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button mode='contained' onPress={() => console.log('Button 1 pressed')}>Button1</Button>
            <Button mode='contained-tonal'onPress={() => console.log('Button 2 pressed')}>Button2</Button>
            <Button mode='outlined' onPress={() => console.log('Button 3 pressed')}>Button3</Button>
            <Button mode='elevated' onPress={() => console.log('Button 4 pressed')}>Button4</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CalculatorScreen;