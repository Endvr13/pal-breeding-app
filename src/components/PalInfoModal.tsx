import { memo } from "react";
import { StyleProp, TextStyle, View} from "react-native";
import { Portal, Text, Modal } from "react-native-paper"
import iconImports from '../utils/iconImports';
import { Image } from "expo-image"

const PalInfoModal = ({ visible, hideModal, workSuitability, palNo, palName, palElement, palAlphaTitle }: { 
    visible: boolean, 
    hideModal: () => void, 
    workSuitability: Record<string, string>, 
    palNo: string, palName: string, 
    palElement: string, palAlphaTitle: string 
}) => {

    const workSuitabilityKeys = Object.keys(workSuitability);

    function getTextSuitability(suitability: string | number) {
        if(suitability === 0) {
            return {fontWeight: "normal", opacity: 0.5, fontSize:15};
        } else {
            return {fontWeight: "bold", fontSize:15};
        }
    }

    function getImageSuitability(suitability: string | number) {
        if(suitability === 0) {
            return {opacity: 0.5};
        } else {   
            return {opacity: 1};
        }
    }

    function getViewSuitability(suitability: string | number) {
        if(suitability === 0) {
            return {};
        } else {   
            return {backgroundColor: 'skyblue', borderRadius: 10};
        }
    }

    const words = ["dark", "dragon", "electric", "fire", "ground", "grass", "ice", "neutral", "water"];

    function splitString(input: string): string[] {
        for (let word of words) {
            console.log('input', input, 'word:', word)
            if (input.startsWith(word)) {
                const index = word.length;
                const first = input.substring(0, index);
                const second = input.substring(index);
                console.log([first, second]);
                return [first, second];
            }
        }
    }

    function sanitiseAndCapitalise(input: string): string {
        
        return input.replace(/,/g, '').replace(/^./, match => match.toUpperCase());
    }

    function removeUnderscore(input: string): string {
        return input.replace(/_/g, ' ');
    }

    const firstElement = splitString(palElement.toString())[0];
    const secondElement = splitString(palElement.toString())[1];

    const sanitisedFirstElement = sanitiseAndCapitalise(firstElement);
    const sanitisedSecondElement = sanitiseAndCapitalise(secondElement);

    const sanitisedPalName = removeUnderscore(palName);

    return (
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ borderTopRightRadius: 15, borderTopLeftRadius:15, margin: 10, backgroundColor:'skyblue'}}>
                    <View style={{flexDirection: 'column', backgroundColor:'skyblue', borderTopLeftRadius:15, borderTopRightRadius:15, paddingHorizontal:15}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline', borderBottomWidth:1,}}>
                            <Text style={{fontSize: 36, textAlignVertical:'center', textAlign:'center', fontWeight: 'bold', color:'black'}}>{palNo}</Text>
                            <Text style={{fontSize: 24, textAlignVertical:'center', textAlign:'center', fontWeight: 'bold', color:'black'}}>{sanitisedPalName} </Text>
                            <View style={{flexDirection: 'row', justifyContent:'center'}}>
                                <View style={{flexDirection:'row', paddingTop:5, paddingBottom:5, alignItems:'center', justifyContent:'center'}}>
                                    <Image
                                        source={iconImports[sanitisedFirstElement]}
                                        style={{width:32, height: 32}}
                                    />                              
                                </View>
                                {sanitisedSecondElement && (
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Image
                                            source={iconImports[sanitisedSecondElement]}
                                            style={{width:32, height: 32}}
                                        />                               
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center', backgroundColor:'skyblue', paddingLeft:7, paddingTop:2}}>
                            <Image
                                source={iconImports['Alpha']}
                                style={{width:36, height: 36}}
                            />
                            <Text style={{color:'black', fontWeight:'bold', fontSize:20}}> {palAlphaTitle} </Text>
                        </View>                        
                    </View>                        
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems:'center', justifyContent:'center', backgroundColor:'lightblue', paddingVertical:8, borderWidth:1, borderColor:'rgba(158, 150, 150, .5)', margin:6}}>
                        {workSuitabilityKeys.map((key, index) =>(
                            <View key={index} style={{...getViewSuitability(workSuitability[key]), flexDirection:"row", alignItems:'center', flexBasis: '45%', marginVertical:2, marginHorizontal:5}}>
                                <Image
                                    source={iconImports[key]}
                                    style={{...getImageSuitability(workSuitability[key]),  width: 24, height: 24, borderRadius:10, marginHorizontal: 8, marginVertical:2 }}
                                    />                             
                                <Text style={getTextSuitability(workSuitability[key]) as StyleProp<TextStyle>}>{`${key.charAt(0).toUpperCase() + key.slice(1)} Lv${workSuitability[key]}`}</Text>
                            </View>
                        ))}    
                    </View>
                        
                </Modal>
            </Portal>
    )
};


export default memo(PalInfoModal);