import React, {Component} from 'react';
import {Container, Content, Icon, Thumbnail, 
Header, Left, Body,Form,  Button, Text, Spinner, Toast, Root} from 'native-base'
import {View, StyleSheet, ToastAndroid, BackHandler, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import functions from './functions'
import { StatusBar } from 'expo-status-bar'

export default class Login extends Component {
    constructor(){
        super()
        this.state={
            sendform :false 

        }
    }

    componentDidMount(){
        this.setState({sendform: false})
    }

    handleBackButton() {
        ToastAndroid.show('Accediendo...', ToastAndroid.SHORT);
        return true;
    }

    loginwithgoogle = async() => {
        this.setState({sendform:true})
        if(Platform.OS == "android"){
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
        const login = await functions.loginbygoogle()
        switch(login.response){
            case true :
                this.setState({sendform:false})
                this.props.navigation.navigate('AuthLoading')
            break
            case false :
                this.setState({sendform:false})
                Toast.show({
                    text: login.error,
                    buttonText: 'Okay'
                  })
            break;
        } 
    }

    loginwithfacebook = async() => {
        this.setState({sendform:true})
        if(Platform.OS == "android"){
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
        const login = await functions.loginbyfacebook()
        switch(login.response){
            case true :
                this.setState({sendform:false})
                this.props.navigation.navigate('AuthLoading')
            break
            case false :
                this.setState({sendform:false})
                Toast.show({
                    text: login.error,
                    buttonText: 'Okay'
                  })
            break;
        } 
    }
    
    render(){
        return(
            <Root>
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
                            <Form>
                            <View style={styles.formcontainer}>
                                <Button 
                                onPress={this.loginwithfacebook}
                                disabled={this.state.sendform}
                                block primary iconRight style={styles.button}>
                                    <Icon
                                    type="EvilIcons"
                                    name="sc-facebook"
                                    />
                                    <Text>
                                        Entrar con facebook
                                    </Text>
                                </Button>
                                <Button
                                onPress={this.loginwithgoogle}
                                disabled={this.state.sendform} 
                                block light iconRight style={styles.button}>
                                    <Image 
                                    source={require('../../../assets/google.png')}
                                    style={{width: 18, height:18}}
                                    />
                                    <Text>
                                        {'   '}Entrar con google{''}
                                    </Text>
                                </Button>
                            </View>
                        </Form>
                        { this.state.sendform == true
                        ?
                        <Spinner color="red"/>
                        :
                        null
                        }
                    </Content>
                    <View style={styles.footercontainer}>
                        <TouchableOpacity>
                            <Text style={styles.text}>
                                Al entrar estarás  Aceptando nuestros terminos y condiciones
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar style="light"/>
                </Container>
            </Root>
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
        backgroundColor: '#c8001d'
    },
    icon: {
        fontSize: 36,
        color : 'white',
        marginTop: 15
    },
    formcontainer:{
        width:'100%',
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 40
    },
    button:{
        marginVertical: 10
    },
    footercontainer: {
        width : '100%',
        padding: 5,
        alignItems : 'center'
    },
    text: {
        fontSize: 8, 
        color: '#c8001d'
    }
})
