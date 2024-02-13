import React, { memo, useEffect,  } from "react";
import { View } from "react-native"
import { Surface, Text, Button, Checkbox, IconButton } from "react-native-paper"
import { Image } from "expo-image"
import iconImports from "../utils/iconImports";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PalButton = ({onPress, palName, palElement, palNumber, palIcon, onIncreaseCaughtQuantity, onDecreaseCaughtQuantity }: { 
    onPress: () => void;
    palName: string;
    palElement: string;
    palNumber: number;
    palIcon: any;
    onIncreaseCaughtQuantity: (name: string, quantity: number) => void;
    onDecreaseCaughtQuantity: (name: string,quantity: number) => void;
}) => {

    const [firstElement, secondElement] = splitString(palElement);
    const [caughtQuantity, setCaughtQuantity] = React.useState(0);
    const [isLucky, setIsLucky] = React.useState(false);
    const [isAlpha, setIsAlpha] = React.useState(false);

    function splitString(input: string): [string, string] {
        const spaceIndex = input.indexOf(' ');
        return spaceIndex !== -1
            ? [input.slice(0, spaceIndex), input.slice(spaceIndex + 1)]
            : [input, ''];
    };

    useEffect(() => {
        const loadStates = async () => {
            try {
                const storedState = await AsyncStorage.getItem(palName);
                if (storedState) {
                    const parsedState = JSON.parse(storedState);
                    setCaughtQuantity(parsedState.quantity || 0);
                    setIsLucky(parsedState.isLucky || false);
                    setIsAlpha(parsedState.isAlpha || false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        loadStates();
        console.log('palName:', palName, 'caughtQuantity:', caughtQuantity, 'isAlpha:', isAlpha, 'isLucky:', isLucky);
    }, [palName, caughtQuantity, isAlpha, isLucky]);
    
    const handleIncreaseCaughtQuantityChange = () => {
        const newQuantity = caughtQuantity + 1;
        if (newQuantity > 99) {
            setCaughtQuantity(99);
        } else {
            setCaughtQuantity(newQuantity);
        }
        onIncreaseCaughtQuantity(palName, newQuantity);
        try {
            AsyncStorage.setItem(palName, JSON.stringify({quantity: newQuantity, isLucky, isAlpha}));
        } catch (error) {
            console.log(error);
        }
    }

    const handleDecreaseCaughtQuantityChange = () => {
        const newQuantity = caughtQuantity - 1;
        if (newQuantity < 0) {
            setCaughtQuantity(0);
        } else {
            setCaughtQuantity(newQuantity);
        }
        onDecreaseCaughtQuantity(palName, newQuantity);
        try {
            AsyncStorage.setItem(palName, JSON.stringify({quantity: newQuantity, isLucky, isAlpha}));
        } catch (error) {
            console.log(error);
        }
    }

    const handleLuckyCheckboxChange = () => {
        setIsLucky(!isLucky);
        try {
          AsyncStorage.setItem(
            palName,
            JSON.stringify({ quantity: caughtQuantity, isLucky: !isLucky, isAlpha })
          );
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleAlphaCheckboxChange = () => {
        setIsAlpha(!isAlpha);
        try {
          AsyncStorage.setItem(
            palName,
            JSON.stringify({ quantity: caughtQuantity, isLucky, isAlpha: !isAlpha })
          );
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <Surface style={{elevation: 4, margin: 8, borderRadius: 8, minWidth:'80%'}}>
            <View style={{borderRadius:8, flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'column' }}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{justifyContent:'flex-start'}}>
                                <Image
                                    source={palIcon}
                                    style={{width: 75, height: 75, borderRadius:10, marginTop: 8, marginLeft:8, marginRight:3}}
                                />
                            </View>
                            <View>
                                <View style={{flexDirection: 'column', paddingVertical:8}}>
                                    <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                        <Text style={{fontSize:18, fontWeight:'bold'}}>{palNumber} </Text>
                                        <Text style={{fontSize:16, fontWeight:'bold'}}>{palName}</Text>
                                    </View>
                                    <View style={{flexDirection: 'column'}}>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <Image
                                                source={iconImports[firstElement]}
                                                style={{width:24, height: 24}}/>
                                            <Text theme={{}}style={{fontSize:16}}> {firstElement} </Text>
                                        </View>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <Image
                                                source={iconImports[secondElement]}
                                                style={{width:24, height: 24}}/>
                                            <Text style={{fontSize:16}}> {secondElement}</Text>                                        
                                        </View> 
                                    </View>                      
                                </View>
                            </View>                            
                        </View>
                        <View style={{flexDirection:'row', paddingLeft:5, paddingBottom:5}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image source={iconImports['Alpha']} style={{width:36, height: 36}}></Image>
                                <Text style={{fontSize:16}}>Alpha</Text>
                                <Checkbox status={isAlpha ? "checked" : "unchecked"} onPress={handleAlphaCheckboxChange}/>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image source={iconImports['Lucky']} style={{width:36, height: 36}}></Image>
                                <Text style={{fontSize:16}}>Lucky</Text>
                                <Checkbox status={isLucky ? "checked" : "unchecked"} onPress={handleLuckyCheckboxChange}/>
                            </View>
                              
                        </View>
                    </View>
                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', paddingBottom:7}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <IconButton icon='minus' size={30} onPress={handleDecreaseCaughtQuantityChange}></IconButton>
                                <Text style={{fontSize:26, minWidth:30, textAlign:'center'}}>{caughtQuantity}</Text>
                                <IconButton icon='plus' size={30} onPress={handleIncreaseCaughtQuantityChange}></IconButton>
                            </View>                        

                        <Button compact={true} mode='contained' onPress={onPress} labelStyle={{fontSize:16}} style={{width:125}}>More Info</Button>  
                    </View>                    
            </View>
        </Surface>
    );
};

export default memo(PalButton);