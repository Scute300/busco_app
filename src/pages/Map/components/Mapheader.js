import * as React from 'react';
import {Content, Container, Text, Icon, Header, Left, Body,} from 'native-base';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar'



class Mapheader extends React.Component{
    constructor(){
        super()
        this.state={
            size: 0,
            isblock: true,
            lat: 0,
            lng: 0 
        }
    }

    UNSAFE_componentWillMount(){
        
    }

    render(){
        if(this.props.onmap == true ) {
            return(
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate('Home')
                        }}>
                            <Icon
                            style={styles.icon}
                            type='Ionicons'
                            name='arrow-back'
                            /> 
                        </TouchableOpacity>
                    </Left>
                    <Body/>
                <StatusBar style="light"/>
                </Header>
            )
        } else {
            return(
                <View style={styles.navbarcontainer}>
                    <View style={{flex : .20, alignItems: 'flex-start'}}>
                        <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate('Home')
                        }}>
                            <Icon
                            style={styles.icon}
                            type='Ionicons'
                            name='arrow-back'
                            /> 
                        </TouchableOpacity>
                    </View>
                    <View style={{flex : 1, justifyContent: 'flex-end'}}>
                        <TextInput style={styles.textinput}/>
                    </View>
                    <View style={{flex : .1, alignItems: 'flex-end'}}>
    
                    </View>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    navbarcontainer : {
        width : '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    icon: {
        fontSize: 36,
        color : 'black',
        marginTop: 15
    },
    header :{
        backgroundColor: '#c8001d' 
    },
    textinput : {
        width: '100%',
        height: 40,
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop : 15
    }
})

export default(Mapheader)