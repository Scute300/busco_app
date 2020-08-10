import React, {Component} from 'react';
import {Container, Content, Icon, Title, Thumbnail, 
Header, Left, Body,Form, Item,Input, Button, Text, Spinner} from 'native-base'
import {View, StyleSheet, ToastAndroid, BackHandler} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'

export default class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password: '',
            sendform :true 

        }
    }

    componentDidMount(){
        this.setState({sendform: false})
    }

    handleBackButton() {
        ToastAndroid.show('Accediendo...', ToastAndroid.SHORT);
        return true;
    }

    login = async()=> {
        setTimeout(async()=>{
            if(this.state.sendform == false){
                if(Platform.OS == "android"){
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
                    }
                this.setState({sendform : true})
                if(this.state.sendform == true){
                    const login = await functions.login(this.state.email, this.state.password)
                    switch(login.response){
                        case true :
                            this.props.navigation.navigate('AuthLoading')
                        break;
                        case false :
                            this.refs.toast.show(login.error);
                            this.setState({sendform : false})
                            if(Platform.OS == "android"){
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                        break;
                        case 'error' :
                            this.setState({sendform : false})
                            this.refs.toast.show('Comprueba tu conexión');
                            if(Platform.OS == "android"){
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                        break;
                            
                    }
                }
            }

        }, 1000)

    }

    
    render(){
        return(
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
                            onChangeText={(email) =>
                            this.setState({email})}
                            maxLength={80}
                            editable={!this.state.sendform}
                            placeholder={'Email'}
                            ></Input>
                        </Item>
                        <Item>
                            <Input
                            onChangeText={(password) =>
                            this.setState({password})}
                            maxLength={30}
                            editable={!this.state.sendform}
                            secureTextEntry={true}
                            placeholder={'Contraseña'}
                            />
                        </Item>
                         <Button 
                         onPress={this.login}
                         disabled={this.state.sendform}
                         style={styles.button} full>
                             {this.state.sendform == false
                             ?
                             <Text>Acceder</Text>
                             :
                             <Spinner
                             color="white"
                             />
                             }
                         </Button>
                    </Form>
                    <View style={styles.vicon}>
                        <TouchableOpacity onPress={()=> { 
                            if(this.state.sendform == false){
                                this.props.navigation.navigate('Forgot')
                            } 
                            }}>
                            <Text style={styles.texto}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                            <Text style={styles.texto}>O</Text>
                        <TouchableOpacity onPress={()=> { 
                            if(this.state.sendform == false){
                                this.props.navigation.navigate('Signup')
                            } 
                            }}>
                            <Text style={styles.texto}>¿Deseas Registrarte?</Text>
                        </TouchableOpacity>
                    </View>
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
