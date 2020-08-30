import React, {Component} from 'react';
import {Container, Content, Icon, Spinner, Form, 
Item, Input, Text, Body, Header, Left} from 'native-base'
import {StyleSheet, 
View, TouchableOpacity, Platform, 
AsyncStorage,BackHandler,ToastAndroid} from 'react-native'
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'
import { StatusBar } from 'expo-status-bar'

class Aoptions extends Component{
    constructor(){
        super()
        this.state={
            email : '',
            password: '',
            sendform: true
        }
    }

    UNSAFE_componentWillMount(){
        this.setState({sendform : false})
    }

    handleBackButton() {
        ToastAndroid.show('Guardando', ToastAndroid.SHORT);
        return true;
    }

    sendemail = async()=>{
        if(this.state.sendform == false){
            if(Platform.OS == "android"){
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }
            this.setState({sendform: true})
            const data = await functions.aemail(this.state.email)
            switch(data.response){
                case true:
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                    this.refs.toast.show('Inicia sesión con tus nuevos datos')
                    await AsyncStorage.clear()
                    this.props.navigation.navigate('AuthLoading')
                break
                case false:
                    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    this.refs.toast.show(data.data)
                    this.setState({sendform : false})
                break
            }

        }
    }

    sendpassword = async()=>{
        if(this.state.sendform == false){
            if(Platform.OS == "android"){
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }
            this.setState({sendform: true})
            const data = await functions.apassword(this.state.password)
            switch(data.response){
                case true:
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                    this.refs.toast.show('Inicia sesión con tus nuevos datos')
                    await AsyncStorage.clear()
                    this.props.navigation.navigate('AuthLoading')
                break
                case false:
                    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    this.refs.toast.show(data.data)
                    this.setState({sendform : false})
                break
            }

        }
    }

    sendpassword = async()=>{
        if(this.state.sendform == false){
            if(Platform.OS == "android"){
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }
            this.setState({sendform: true})
            const data = await functions.aemail(this.state.email)
            switch(data.response){
                case true:
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                    this.refs.toast.show('Inicia sesión con tus nuevos datos')
                    await AsyncStorage.clear()
                    this.props.navigation.navigate('AuthLoading')
                break
                case false:
                    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    this.refs.toast.show(data.data)
                    this.setState({sendform : false})
                break
            }

        }
    }
    
    render(){
        return(
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('Modificar')}}>
                            <Icon
                            type="Ionicons"
                            name="arrow-back"
                            style={styles.headericon}
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body/>
                </Header>
                <Content>
                    <Form>
                        <Text>
                            Email
                        </Text>
                        <Item>
                            <Input
                            editable={!this.state.sendform}
                            maxLength={60}
                            onChangeText={(email) =>
                            this.setState({email})}
                            />
                            <TouchableOpacity
                            onPress={()=>{
                                if(this.state.sendform == false){
                                    this.sendemail()
                                }
                            }}>
                                <Icon
                                type="Ionicons"
                                name="construct"
                                />
                            </TouchableOpacity>
                        </Item>
                        <Text>
                            Contraseña
                        </Text>
                        <Item>
                            <Input
                            editable={!this.state.sendform}
                            maxLength={25}
                            onChangeText={(email) =>
                            this.setState({email})}
                            />
                            <TouchableOpacity
                            onPress={()=>{
                                if(this.state.sendform == false){
                                    this.sendpassword()
                                }
                            }}
                            >
                                <Icon
                                type="Ionicons"
                                name="construct"
                                />
                            </TouchableOpacity>
                        </Item>
                    </Form>
                    {!this.state.sendform
                    ?
                    <View style={styles.text}>
                        <Text style={styles.headericon}>Actualiza el dato correspondiente</Text>
                        <Text style={styles.headericon}>Y oprime el icono de configuración</Text>
                    </View>
                    :
                    <View style={styles.text}>
                        <Text style={styles.headericon}>Actualiza el dato correspondiente</Text>
                        <Text style={styles.headericon}>Y oprime el icono de configuración</Text>
                        <Spinner color='#c8001d' />
                    </View>
                    }
                </Content>
                <StatusBar style="light" />
                <Toast ref="toast"/>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    header :{
        backgroundColor: 'white'
    },
    headericon: {
        color: '#c8001d' ,
        marginTop: 9
    },
    text : {
        alignItems :'center'
    }
})

export default(Aoptions)