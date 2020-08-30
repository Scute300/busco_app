import React,  {Component} from 'react'
import funciones from './funciones'
import {Spinner} from 'native-base'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../../globalfunctions/actions'
import { StatusBar } from 'expo-status-bar'

class AuthLoading extends Component {
    constructor(){
        super();
        this.state = {

        }
        
    }

    UNSAFE_componentWillMount(){
        this.comprobation()
    }

    comprobation = async() =>{
        const run = await funciones.comprobation()
            switch(run.response){
                case false:
                    this.props.navigation.navigate('App')
                break;
                case true :
                    this.props.OnUserSession({isonline : true, userdata : run.data})
                    this.props.navigation.navigate('App')
                break
                case 'error':
                break                      
            }
    }

    render(){
        return(
            <View style={Styles.container}>
                <Spinner color='red'/>
                <StatusBar style="light" />
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignContent :'center'
    }
})
  
export default connect(null , actions)(AuthLoading)