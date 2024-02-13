import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const goToCalculatorScreen = () => {
        navigation.navigate('Calculator');
    };

    return (
        <View style={styles.container}>
            <Button title="Go to Calculator" onPress={goToCalculatorScreen} />
            <Button title="Go to Pal Deck" onPress={() => navigation.navigate('PalDeck')} />
            <Button title="Clear data" onPress={() => AsyncStorage.clear()} />
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

export default HomeScreen;