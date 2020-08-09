import React, {Component} from 'react';
import {Container, Content, Icon, Spinner, Thumbnail, Form, Item, Input, Text, Button} from 'native-base'
import {connect} from 'react-redux'
import Navbar from '../../globalfunctions/globalcomponents/navbar'
import * as actions from '../../globalfunctions/actions'
import {Animated, StyleSheet, View, TouchableOpacity, 
Platform, BackHandler,ToastAndroid, Alert} from 'react-native'
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'

class Update extends Component{
    constructor(){
        super()
        this.state={
            base64: null,
            imagepreview : null,
            nombre : '',
            edad: '',
            bio: '',
            sendform : true,
            animated : new Animated.Value(0),
            animatedXY : new Animated.ValueXY({x: 0, y:1000}),
            advancebutton: new Animated.Value(1),
            advanceoptions: new Animated.Value(0),
            height : 0,
            advanced: false,
            password: ''
        }
        this.animateInterpolate = this.state.animatedXY.y.interpolate({
            inputRange: [0, 100],
            outputRange:[1, 0]
        })
    }

    async componentDidMount(){
        this.setState({
            nombre : this.props.userdata.userdata.name,
            edad: this.props.userdata.userdata.cumpleaños,
            bio: this.props.userdata.userdata.bio,
            sendform : false})
            setTimeout(()=>{
                Animated.timing(this.state.animatedXY,{
                    toValue: {x:0, y: 0},
                    duration: 800
                }).start()
            }, 100)
        await this.props.navigation.addListener(
        'willFocus',
        () => {
            this.setState({
                nombre : this.props.userdata.userdata.name,
                edad: this.props.userdata.userdata.cumpleaños,
                bio: this.props.userdata.userdata.bio,
                sendform : false,
                password: '',
                advanced: false})
        })
            
    }


    handleBackButton() {
        ToastAndroid.show('Guardando', ToastAndroid.SHORT);
        return true;
    }

    preview = async(quitar)=>{
        if(quitar == false){
            const image = await functions.getprofilepicturepreview()
            switch(image.response){
                case true : 
                    this.setState({imagepreview : image.imageuri, base64 : image.base64})
                    break;
                case false :
                    break
            }
        } else{
            this.setState({imagepreview : null, base64 : null})
        }
    }
    changeavatar = async()=>{
        if(this.state.sendform == false){
            if(Platform.OS == "android"){
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }
            this.setState({sendform : true})
            const change = await functions.changeavatar(this.state.base64)
            switch(change.response){
                case true :
                    this.props.OnUserSession({isonline : true, userdata : change.data})
                    this.setState({imagepreview : null,base64 : null,sendform: false})
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                    break;
                case false :
                    this.setState({sendform: false})
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                    break;
            }

        }
    }

    onchange(value, type, dflt){
        if(value !== ''){
            switch(type){
                case 'nombre':
                    this.setState({nombre: value})
                    break
                case 'edad':
                    this.onChangedNumber(value)
                    break
                case 'bio':
                    this.setState({bio : value})
                    break
            }
        } else {
            switch(type){
                case 'nombre':
                    this.setState({nombre: dflt})
                    break
                case 'edad':
                    this.setState({edad: dflt})
                    break
                case 'bio':
                    this.setState({bio : dflt})
                    break
            }
        }
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
        this.setState({ edad: newText });
    }

    location = async()=>{
        if(this.state.sendform == false){
            if(Platform.OS == "android"){
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }
            this.setState({sendform : true})
            const locate = await functions.location()
            switch(locate.response){
                case true : 
                    this.props.OnUserSession({isonline : true, userdata : locate.data})
                    this.setState({sendform:false})
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                break
                case false :
                    this.setState({sendform:false})
                    this.refs.toast.show('No se puede acceder en este momento');
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                break    
            }
        }
    }

    newdata = async()=>{
        if(this.state.sendform == false){
            if(Platform.OS == "android"){
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }
            this.setState({sendform : true})
            const data = await functions.updatedata(this.state.nombre, this.state.edad, this.state.bio)
            switch(data.response){
                case true:
                    this.props.OnUserSession({isonline : true, userdata : data.data})
                    this.setState({sendform:false})
                    this.refs.toast.show('Datos Actualizados');
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                break
                case false :
                    this.setState({sendform:false})
                    this.refs.toast.show(data.data);
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                break
            }
        }
    }

    Aoptions= async()=>{
        if (this.state.advanced == false){
            await this.setState({advancebutton: new Animated.Value(1), 
                advanceoptions : new Animated.Value(0),})
            Alert.alert('Es necesario colocar tu contraseña para continuar')
            await Animated.timing(this.state.advancebutton,{
                toValue: 0,
                duration: 2000
            }).start()

            await  this.setState({advanced: true})
            
            await Animated.timing(this.state.advanceoptions,{
                toValue: 1,
                duration: 2000
            }).start()
        } else {
            await this.setState({advanceoptions : new Animated.Value(1),
                advancebutton: new Animated.Value(0)})
            await Animated.timing(this.state.advanceoptions,{
                toValue: 0,
                duration: 1000
            }).start()
            await this.setState({advanced: false})
            await Animated.timing(this.state.advancebutton,{
                toValue: 1,
                duration: 1000
            }).start()
        }
    }

    verify = async()=> {
        if(this.state.sendform == false){
            this.setState({sendform : true})
            if(Platform.OS == "android"){
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }
            const res = await functions.verifypassword(this.state.password)
            switch(res.response){
                case true : 
                    this.setState({sendform: false})
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                    this.props.navigation.navigate('Aoptions')
                break
                case false :
                    this.setState({sendform: false})
                    if(Platform.OS == "android"){
                        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                    this.refs.toast.show('Contraseña Incorrecta');
                    break
            }
        }
    }

    render(){
        return(
            <Container>
                <Navbar
                navigation={this.props.navigation}
                userdata={this.props.userdata}
                />
                <Content>
                    <Animated.View style={{marginTop : this.state.animatedXY.y, opacity: this.animateInterpolate}}>
                        <View style={styles.cont}>
                            <Thumbnail
                            large
                            source={{uri : (this.state.imagepreview == null)? this.props.userdata.userdata.avatar
                            :this.state.imagepreview}}
                            />
                            {this.ipreview(this.state.imagepreview)}
                        </View>
                        <Form>
                            <Text style={styles.icon}>Nombre</Text>
                            <Item>
                                <Input
                                maxLength={25}
                                editable={!this.state.sendform}
                                onChangeText={(nombre) =>
                                this.onchange(nombre,'nombre',this.props.userdata.userdata.nombre)}
                                placeholder={this.props.userdata.userdata.name}
                                />
                            </Item>
                            <Text style={styles.icon}>Edad</Text>
                            <Item>
                                <Input
                                maxLength={8}
                                editable={!this.state.sendform}
                                onChangeText={(edad) =>
                                this.onchange(edad,'edad',this.props.userdata.userdata.cumpleaños)}
                                value={this.state.edad}
                                placeholder={this.props.userdata.userdata.cumpleaños == null 
                                    ? 'DDMMAAAA' : this.props.userdata.userdata.cumpleaños  }
                                />
                            </Item>
                            <Text style={styles.icon}>Sobre ti</Text>
                            <Item>
                                <Input
                                maxLength={100}
                                editable={!this.state.sendform}
                                onChangeText={(bio) =>
                                this.onchange(bio,'bio',this.props.userdata.userdata.bio)}
                                placeholder={this.props.userdata.userdata.bio == null 
                                    ? 'Cuentanos algo sobre ti' : this.props.userdata.userdata.bio}
                                />
                            </Item>
                            <Text style={styles.icon}>Ubicación</Text>
                            <Item>
                                <TouchableOpacity
                                onPress={this.location}
                                >
                                <Input 
                                editable={false}
                                onPress={this.lo}
                                placeholder={this.props.userdata.userdata .location ==null
                                ? 'Oprime para acceder a tu ubicación' : this.props.userdata.userdata.location}
                                />
                                </TouchableOpacity>
                            </Item>
                            <Button 
                            onPress={this.newdata}
                            full 
                            style={styles.btn}
                            disabled={this.state.sendform}>
                                { this.state. sendform == false
                                ?
                                <Text>
                                    Guardar
                                </Text>
                                :
                                <Spinner color="white"/>
                                }
                            </Button>
                        </Form>
                        {this.advanced(this.state.advanced)}
                    </Animated.View>
                </Content>
                 <Toast ref="toast"/>
            </Container>
        )
    }
    ipreview (status){
        if(status == null){
            return (
                <TouchableOpacity
                onPress={()=>{
                    if(this.state.sendform == false){
                        this.preview(false)
                    }
                    }}>
                    <Icon
                    type="FontAwesome"
                    name="edit"
                    style={styles.icon}
                    />
                </TouchableOpacity>
            )
        } else {
            return(
                <View style={styles.buttons}>
                <TouchableOpacity 
                onPress={this.changeavatar}>
                    <Icon
                    type="FontAwesome"
                    name="check"
                    style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                    if(this.state.sendform == false){
                        this.preview(true)
                    }
                    }}>
                    <Icon
                    type="FontAwesome"
                    name="close"
                    style={styles.icon}
                    />
                </TouchableOpacity>

                </View>
            )
        }
    }

    advanced(view){
        if(view == false){
            return(
                <Animated.View style={{ alignItems: 'center', justifyContent: 'center' ,opacity : this.state.advancebutton}}>
                    <TouchableOpacity
                    onPress={this.Aoptions}>
                        <Text style={styles.icon}>
                            Opciones avanzadas
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            )
        }else {
            return (
                <Animated.View style={{opacity : this.state.advanceoptions}}>
                    <Form>
                        <Item>
                            <Input
                            value={this.state.password}
                            secureTextEntry={true}
                            maxLength={20}
                            onChangeText={(password) =>
                            this.setState({password : password})}
                            placeholder={'Escribe tu contraseña...'}
                            />
                        </Item>
                        <Button 
                        onPress={this.verify}
                        full style={styles.btn}>
                            {this.state.sendform == false
                            ?
                            <Text>Continuar</Text>
                            :
                            <Spinner color='white'/>
                            }
                        </Button>
                        <TouchableOpacity 
                        onPress={this.Aoptions}>
                            <Text style={styles.icon}>Mejor no...</Text>
                        </TouchableOpacity>
                    </Form>
                </Animated.View>
            )
        }
    }
}

const styles= StyleSheet.create({
    cont : {
        justifyContent : 'center',
        alignItems: 'center',
        marginTop : 15
    },
    icon : {
        color : '#c8001d'
    },
    btn :{
        backgroundColor: '#c8001d'
    },
    buttons:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    }
})

const mapStateToProps = state => {
    return {userdata : state.userdata}
}
  
export default connect(mapStateToProps, actions)(Update)