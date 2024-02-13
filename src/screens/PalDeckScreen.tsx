import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import palsData from '../utils/pals.json';
import iconImports from '../utils/iconImports';
import PalButton from '../components/PalButton';
import PalInfoModal from '../components/PalInfoModal';
import { FlashList } from '@shopify/flash-list';
import { Button, Searchbar, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Pal {
    name : string;
    number : string;
    breedingPower : number;
    icon : string;
    element : string[];
    workSuitability : {
        [key: string]: number;
    };
    tieBreakOrder: number;
    alpha_title: string;
    index: number;
}

const PalDeckScreen = () => {
    const [selectedPal, setSelectedPal] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [sortType, setSortType] = React.useState('number');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [pals, setPals] = React.useState([]);

    useEffect(() => {
        const loadPals = async () => {
            try {
                const storedPals = await AsyncStorage.getItem('pals');
                if (storedPals) {
                    setPals(JSON.parse(storedPals));
                }
            } catch (error) {
                console.log(error);
            }
        };
        loadPals();
    }, []);

    const updateQuantityState = async (palName: string, quantity: number) => {
        const updatedPals = pals.map((pal) =>
            pal.name === palName ? {...pal, quantity} : pal
        );
        setPals(updatedPals);
        try {
            await AsyncStorage.setItem('pals', JSON.stringify(updatedPals));
        } catch (error) {
            console.log(error);
        }
    }

    const renderButtons = ({ item }) => {
        const sanitisedName = item.name.replace(/_/g, ' ');
        const displayElement = Array.isArray(item.element)
            ? item.element
                .map(element => {
                    return element.charAt(0).toUpperCase() + element.slice(1);
                })
                .join(' ')
            : item.element.charAt(0).toUpperCase() + item.element.slice(1);

        return (
            <>
                <PalButton
                key={item.index}
                onPress={() => {
                    setSelectedPal(item);
                    setModalVisible(true);
                }}
                palName={sanitisedName}
                palElement={displayElement}
                palNumber={item.number}
                palIcon={iconImports[item.name]}
                onDecreaseCaughtQuantity={updateQuantityState}
                onIncreaseCaughtQuantity={updateQuantityState}
                />
            </> 
        );
    };

    const hideModal = () => {
        setModalVisible(false);
        setSelectedPal(null);
    };  

    const sortAlphabetically = (pals: Pal[]) => {
        return pals.sort((a, b) => a.name.localeCompare(b.name));
    };

    const sortReverseAlphabetically = (pals: Pal[]) => {
        return pals.sort((a, b) => b.name.localeCompare(a.name));
    };

    const sortByNumber = (pals: Pal[]) => {
        return pals.sort((a, b) => {
            if (isNaN(parseInt(a.number))) {
                return a.number.localeCompare(b.number);
            } else {
                return parseInt(a.number) - parseInt(b.number);
            }
        });
    };

    const handleSortButtonPress = ( type: string) => {
        setSortType(type);
    };

    const sortedPals = React.useMemo(() => {
        const pals = [...palsData.pals]
        switch(sortType) {
            case 'alphabetically':
                return sortAlphabetically(pals);
            case 'reverseAlphabetically':
                return sortReverseAlphabetically(pals);
            case 'number':
            default:
                return sortByNumber(pals);
        }
    }, [sortType, palsData.pals]);
    
    const keyExtractor = (item: Pal) => `${item.number.toString()}-${item.name}-${item.index}`;

    const filterPals = (query, pals) => {
        if (!query) 
            return pals;
        const lowercasedQuery = query.toLowerCase();
        return sortByNumber(pals.filter(pal => {
            return pal.name.toLowerCase().includes(lowercasedQuery);
        }));
    };

    const filteredPals = React.useMemo(() => filterPals(searchQuery, sortedPals), [searchQuery, sortedPals]);
    
    return (
            <View style={{flex:1, alignSelf:'center', maxWidth:450}}>
                <View style={{flexDirection:'row', justifyContent:'space-evenly', paddingBottom:5, maxWidth:450}}>
                    <Button icon='sort-alphabetical-ascending' contentStyle={{flexDirection:'row-reverse'}} onPress={() => handleSortButtonPress('alphabetically')}>Sort A-Z</Button>
                    <Button icon='sort-alphabetical-descending' contentStyle={{flexDirection:'row-reverse'}} onPress={() => handleSortButtonPress('reverseAlphabetically')}>Sort Z-A</Button> 
                    <Button icon='sort-numeric-ascending' contentStyle={{flexDirection:'row-reverse'}} onPress={() => handleSortButtonPress('number')}>Sort by Number</Button>
                </View>
                <View style={{marginHorizontal:6, paddingBottom:5}}>
                    <Searchbar placeholder='Search for Pal' onChangeText={setSearchQuery} value={searchQuery}></Searchbar>
                </View>
                <FlashList
                    data={filteredPals}
                    renderItem={renderButtons}
                    keyExtractor={keyExtractor}
                    estimatedItemSize={140}
                />
                {modalVisible && selectedPal && (
                    <PalInfoModal
                        visible={modalVisible}
                        hideModal={hideModal}
                        workSuitability={selectedPal.workSuitability}
                        palNo={selectedPal.number}
                        palName={selectedPal.name}
                        palElement={selectedPal.element}
                        palAlphaTitle={selectedPal.alpha_title}
                    />
                )}
            </View>            
    );

};

export default PalDeckScreen;