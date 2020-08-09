import React, {Component} from 'react';
import {Container, Content, Icon, Title, Thumbnail, 
Header, Left, Body,Form, Item,Input, Button, Text, Spinner} from 'native-base'
import {View, StyleSheet, ToastAndroid, BackHandler} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import functions from './functions'

export default class Forgot extends Component{
    constructor(){
        super()
        this.state={
            email:'',
            sendform: ''
        }
    }

    render(){
        return(
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity
                        onPress={()=>{
                            if(this.state.sendform == false){
                            this.props.navigation.navigate('Login')
                            }
                        }}>
                            <Icon
                            style={styles.icon}
                            type='Ionicons'
                            name='arrow-back'
                            />  
                        </TouchableOpacity>
                    </Left>
                    <Body></Body>
                </Header>
                <Content>
                    <View style={styles.vicon}>
                        <Thumbnail large source={require('../../../assets/icon.png')}/>
                    </View>
                    <Form style={styles.form}>
                        <Item>
                            <Input
                            onChangeText={(email) =>
                            this.setState({email})}
                            maxLength={80}
                            editable={!this.state.sendform}
                            placeholder={'Email'}
                            />
                        </Item>
                         <Button 
                         disabled={!this.state.sendform}
                         style={styles.button} full>
                             {this.state.sendform == false
                             ?
                             <Text>Enviar</Text>
                             :
                             <Spinner
                             color="white"
                             />
                             }
                         </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    vicon: {
        alignItems: 'center',
        justifyContent : 'center',
        marginTop: 60
    },
    header :{
        backgroundColor : 'transparent'
    },
    icon: {
        fontSize: 36,
        color : '#c8001d'
    },
    form: {
        marginTop: 40
    }, 
    button: {
        backgroundColor: '#c8001d'
    }, 
    texto: {
        color: '#c8001d'
    }
})