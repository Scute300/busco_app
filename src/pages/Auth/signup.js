import React, {Component} from 'react';
import {Container, Content, Icon, Title, Thumbnail, 
Header, Left, Body,Form, Item,Input, Button, Text, Spinner} from 'native-base'
import {View, StyleSheet, ToastAndroid, BackHandler, Platform} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'


export default class Signup extends Component {
    constructor(){
        super()
        this.state ={
            sendform : true,
            nombre : '',
            username: '',
            email : '',
            numero:'',
            password: '',
            confirmpassword: ''
        }
    }

    componentDidMount(){
        this.setState({sendform : false})
    }

    handleBackButton() {
        ToastAndroid.show('Accediendo...', ToastAndroid.SHORT);
        return true;
    }

    signup = async()=>{
        setTimeout(async()=>{
            if(this.state.sendform == false){
                if(Platform.OS == "android"){
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
                }
                this.setState({sendform : true})
                if(this.state.sendform == true){
                    const response = await functions.signup(this.state.nombre,this.state.username, this.state.numero,this.state.email, this.state.password,this.state.confirmpassword)
                    switch(response.response){
                        case true:
                            this.props.navigation.navigate('AuthLoading')
                        break;
                        case false:
                            this.setState({sendform: false})
                            this.refs.toast.show(response.error);
                            if(Platform.OS == "android"){
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                        break
                        case 'error':
                            this.refs.toast.show('Las contraseñas no coinciden');
                            this.setState({sendform: false})
                            if(Platform.OS == "android"){
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                        break
                    }
                }
            }

        }, 1000)
    }
    onChangedNumber(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                this.refs.toast.show('Este campo solo acepta numeros');
            }
        }
        this.setState({ numero: newText });
    }

    render(){
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity
                        onPress={()=>{
                            if(this.state.sendform == false){
                                this.props.navigation.navigate('App')
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
                            editable={!this.state.sendform}
                            maxLength={25}
                            onChangeText={(nombre) =>
                            this.setState({nombre})}
                            placeholder={'Nombre'}
                            />
                        </Item>
                        <Item>
                            <Input
                            maxLength={12}
                            editable={!this.state.sendform}
                            onChangeText={(username) =>
                            this.setState({username})}
                            placeholder={'Nombre de Usuario'}
                            />
                        </Item>
                        <Item>
                            <Input
                            maxLength={80}
                            editable={!this.state.sendform}
                            onChangeText={(email) =>
                            this.setState({email})}
                            placeholder={'Email'}
                            />
                        </Item>
                        <Item>
                            <Input
                            maxLength={12}
                            editable={!this.state.sendform}
                            onChangeText={(numero) =>
                            this.onChangedNumber(numero)}
                            value={this.state.numero}
                            placeholder={'Telefono'}
                            ></Input>
                        </Item>
                        <Item>
                            <Input
                            maxLength={15}
                            editable={!this.state.sendform}
                            onChangeText={(password) =>
                            this.setState({password})}
                            editable={!this.state.sendform}
                            placeholder={'Contraseña'}
                            secureTextEntry={true}
                            />
                        </Item>
                        <Item>
                            <Input
                            maxLength={15}
                            onChangeText={(confirmpassword) =>
                            this.setState({confirmpassword})}
                            secureTextEntry={true}
                            editable={!this.state.sendform}
                            placeholder={'Confirmar Contraseña'}
                            />
                        </Item>
                         <Button
                         onPress={this.signup} 
                         disabled={this.state.sendform}
                         style={styles.button} full>
                             {this.state.sendform == false
                             ?
                             <Text>Registar</Text>
                             :
                             <Spinner
                             color='white'
                             />
                             }
                         </Button>
                         <TouchableOpacity
                                onPress={()=> {
                                    if (this.state.sendform == false){
                                        this.props.navigation.navigate('Termns')
                                    }
                                }}>
                         <Text style={styles.texto}>Al registrarte estarás aceptando nuestra 
                                <Text 
                                style={styles.texto2}>
                                    Politica de privacidad</Text>
                        </Text>

                         </TouchableOpacity>
                    </Form>
                </Content>
                 <Toast ref="toast"/>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    vicon: {
        alignItems: 'center',
        justifyContent : 'center',
        marginTop: 20
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
        fontSize: 10
    },
    texto2: {
        color : '#c8001d',
        fontSize: 10
    }
})