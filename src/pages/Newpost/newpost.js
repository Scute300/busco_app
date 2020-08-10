import React, {Component} from 'react';
import {Container, Content, 
Header, Left, Body, Icon, Title, Picker, 
Form, Text, Card, CardItem, Textarea,
Thumbnail,
Button,
Input,
Spinner} from 'native-base'
import {connect} from 'react-redux'
import {Animated, StyleSheet, 
View, TouchableOpacity, Platform, Alert, 
ToastAndroid, BackHandler} from 'react-native'
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'
import * as actions from '../../globalfunctions/actions'


class Newpost extends Component{
    constructor(){
        super()
        this.state = {
            post: 'listado',
            name: '',
            texto:'',
            location: '',
            sendform: true,
            images: [],
            category:'Ropa y calzado',
            price: '',
            estado: 'Nuevo',
            listcategories: ['Ropa y calzado', 'Electronica', 'Hogar', 'Mascotas',
            'Bienes raices', 'Juguetes', 'Autos y transporte', 'Salud y belleza',
            'Deporte'],
            contentpost:'Describe lo que quieras publicar',
            nombrepost:'Ponle nombre a tu post',
            negocioscategories: [
                    'Restaurante',
                    'Ropa',
                    'Electronica',
                    'Clinica',
                    'Farmacia',
                    'Acesorios/complementos/bisutería/moda/belleza',
                    'Animales',
                    'Tienda de frutos secos',
                    'Tienda de guarnicionería',
                    'Armería',
                    'Caramelos/chucherías',
                    'Licorería',
                    'Motos con taller',
                    'Artículos deportivos',
                    'Comics',
                    'Mercería',
                    'Comercio Textil Hogar',
                    'Herboristería',
                    'Parafarmacia',
                    'Librería',
                    'Papelería',
                    'Artes Gráficas',
                    'Comercio de Ofimática e Informática',
                    'Juguetería',
                    'Música',
                    'Perfumería',
                    'Comercio de Artículos de Regalo',
                    'Comercio de Muebles y Decoración',
                    'Floristería',
                    'Ferretería',
                    'Drogería',
                    'Óptica',
                    'Souvenir',
                    'Decoración',
                    'Artículos de Bebe',
                    'Tienda de Videojuegos',
                    'Negocio de Artesanía',
                    'Tienda Étnica',
                    'Lavandería',
                    'Accesorios coches / motos',
                    'Inmobiliaria',
                    'Artículos lúdicos',
                    'Joyería',
                    'Comercio justo',
                    'Vivero',
                    'Relojería',
                    'Esoterismo'
            ],
            lservicios : [
                'Abogado',
                'Dentista',
                'Doctor',
                'Contador',
                'Mecanico',
                'Tecnico',
                'Electrico',
                'Plomero',
                'Albañil',
                'Pintor',
                'Veterinario',
                'Costurera',
                'Agente de seguros'
            ],

        }
    }

    UNSAFE_componentWillMount(){
        this.setState({sendform : false})
    }


    handleBackButton() {
        ToastAndroid.show('Guardando', ToastAndroid.SHORT);
        return true;
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
        this.setState({ price: newText });
    }

    async onValueChange(value){
        switch(value){
            case 'listado':
                await this.setState({contentpost : 'Describe lo que quieres publicar',
                                nombrepost : 'Ponle nombre a tu post',
                                category : 'Ropa y Calzado' , estado : 'Nuevo'})
            break
            case 'negocio': 
            await this.setState({contentpost : 'Describe tu negocio',
                            nombrepost : '¿Como se llama tu negocio?',
                            category : 'Animales', estado : ''})
            break
            case 'servicio':
                this.setState({contentpost : 'Describe tu servicio',
                                nombrepost : '¿Que clase de servicio ofreces?',
                                category : 'Abogado', estado : ''})
            break
            case 'vacante':
                this.setState({contentpost : 'Describe la vacante que ofreces',
                                nombrepost : '¿Que vacante ofreces?', estado : '',
                                category: ''})

        }
        this.setState({images : [], post : value, price : '', text: '', 
                        name:'', location: ''})
    }
    pickacategory(value){
        this.setState({category : value})
    }
    pushimage = async()=>{
        let images = this.state.images
        if(images.length <= 4){
            const image = await functions.image()
            switch(image.response){
                case true :
                    const newimage = {image : image.image, base64 : image.base64}
                    let addimage = this.state.images
                    addimage.push(newimage)
                    this.setState({images : addimage})
                    break
            }  
        }else {
            this.refs.toast.show('No puedes subir más de 8 imagenes');
        }
    }
    estado(value){
        this.setState({estado : value})
    }

    newpost = async()=>{
        setTimeout(async()=>{
            if(this.state.sendform == false){
                if(Platform.OS == "android"){
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
                }
                this.setState({sendform : true})
                if(this.state.sendform == true){
                    const data = await functions.subir(this.state.post,this.state.texto, this.state.name, this.state.images,
                                                        this.state.category, this.state.location, this.state.price, this.state.estado)
                    switch(data.response){
                        case true:
                            if(Platform.OS == "android"){
                                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                            this.setState({name : '', texto : '',location :'', 
                                            images:[], price: '0' ,sendform : false})
                                            let dato = data.data.id
                            this.refs.toast.show('Posteado');
                            this.props.navigation.navigate('Getpost', {dato})
                        break
                        case false :
                            if(Platform.OS == "android"){
                                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                            this.setState({sendform : false})
                            this.refs.toast.show(data.data);
                        break
                    }
                }
            }
        }, 1000)
    }

    getcurriculum = async()=>{

        setTimeout(async()=>{
            if(this.state.sendform == false){
                if(Platform.OS == "android"){
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
                }
                this.setState({sendform : true})
                if(this.state.sendform == true){
                    const document = await functions.getcurriculum(this.props.userdata.userdata.username)
                    switch(document.response){
                        case false :
                            if(Platform.OS == "android"){
                                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                            this.setState({sendform : false})
                            this.refs.toast.show('No se puede postear de momento');
                            break
                        case 'posteado': 
                            if(Platform.OS == "android"){
                                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                            this.props.OnUserSession({isonline : true, userdata : document.data})
                            this.setState({sendform : false})
                            this.refs.toast.show('Posteado');
                        break
                        case 'actualizado' :
                            if(Platform.OS == "android"){
                                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                            this.setState({sendform : false})
                            this.refs.toast.show('Actualizado');
                        break
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
                            this.setState({
                                post: 'listado',
                                name: '',
                                texto:'',
                                location: '',
                                images: [],
                                category:'Ropa y calzado',
                                price: '',
                                estado: 'Nuevo',
                                listcategories: ['Ropa y calzado', 'Electronica', 'Hogar', 'Mascotas',
                                'Bienes raices', 'Juguetes', 'Autos y transporte', 'Salud y belleza',
                                'Deporte'],
                                contentpost:'Describe lo que quieras publicar',
                                nombrepost:'Ponle nombre a tu post',
                            })
                            this.props.navigation.navigate('Home')
                        }}
                        >
                            <Icon
                            type="Ionicons"
                            name="arrow-back"
                            style={styles.icons}
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body/>
                </Header>
                    <Form >
                    <Text style={styles.icons}>¿Que deseas hacer?</Text>
                    <Picker
                    mode="dropdown"
                    enabled={!this.state.sendform}
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={this.state.post}
                    onValueChange={this.onValueChange.bind(this)}
                    >
                    <Picker.Item label="Publicar en Listado" value="listado" />
                    <Picker.Item label="Publicar mi negocio" value="negocio" />
                    <Picker.Item label="Publicar servicio profesional" value="servicio" />
                    <Picker.Item label="Subir mi curriculum" value="curriculum" />
                    <Picker.Item label="Publicar una vacante" value="vacante" />
                    </Picker>
                    </Form>
                    <Content>
                        {this.postcontainer()}
                        <Button 
                        onPress={this.newpost}
                        style={styles.buttons}
                        disabled={this.state.sendform}
                        full>{ this.state.sendform == false 
                            ?
                            <Text>
                                Publicar
                            </Text>
                            :
                            <Spinner
                            color="white"
                            />
                            }
                        </Button>
                    </Content>
                 <Toast ref="toast"/>
            </Container>
        )
    }
    

    imagecolections(value){
        return value.map((data, index, array)=>{
            return(
                <View style={{flexDirection: 'row'}}>
                <Thumbnail small
                style={styles.imagesdirection}
                source={{uri : data.image}}/>
                <Icon
                onPress={()=>{
                    if(this.state.sendform !== true){
                        let newarray = this.state.images
                        newarray.splice(index,1);
                        this.setState({images : newarray})
                    }
                }}
                type='FontAwesome'
                name='close'
                style={{color : '#e83d56', fontSize: 16, marginBottom:20}}
                />
                </View>
            )            
        })
    }
    postcontainer(){
        if(this.state.post !== 'curriculum'){
            return(
                <Card transparent>
                    <CardItem>
                        <Thumbnail
                        source={{uri : this.props.userdata.userdata.avatar }}
                        />
                        <Textarea 
                        onChangeText={(texto) =>
                        this.setState({texto})}
                        value={this.state.texto}
                        editable={!this.state.sendform}
                        placeholder={this.state.contentpost}
                        maxLength={1000}
                        style={{width : '75%', borderColor: 'gray'}}>
                        </Textarea>
                        <TouchableOpacity onPress={
                            ()=>{
                                if(this.state.sendform !== true){
                                    this.pushimage()
                                }
                            }}>
                            <Icon
                            style={styles.elementsicons}
                            type={"Entypo"}
                            name={"images"}/>
                        </TouchableOpacity>
                    </CardItem>
                    <View style={styles.imagesdirection}>
                    {this.imagecolections(this.state.images)}
                    </View>
                    <CardItem>
                        <Input 
                        placeholder={this.state.nombrepost}
                        onChangeText={(name) =>
                        this.setState({name})}
                        editable={!this.state.sendform}
                        maxLength={1000}
                        style={{width : '75%', borderColor: 'gray'}}/>
                    </CardItem>
                    <CardItem>
                        <Input 
                        onChangeText={(location) =>
                        this.setState({location})}
                        value={this.state.location}
                        editable={!this.state.sendform}
                        placeholder={'¿Donde se ubica esto?'}
                        style={{width : '75%', borderColor: 'gray'}}/>
                    </CardItem>
                    {this.postbox(this.state.post)}
                </Card>
            )
        } else{
            return(
                <Card 
                style={{alignItems : "center"}}
                transparent>
                    <CardItem>
                        { this.props.userdata.userdata.cv_id == null
                        ?
                        <Text style={styles.icons}>
                            Al subir tu curriculum este se mostrará 
                            junto a tu perfil profesional 
                        </Text>
                        :
                        <Text style={styles.icons}>
                            Ya tienes un curriculum subido pero puedes
                            actualizarlo subiendo uno nuevo para sobre
                            escribir el anterior
                        </Text>
                        }
                    </CardItem>
                    <TouchableOpacity
                    onPress={this.getcurriculum}>
                        <Icon 
                        style={styles.icons}
                        type='AntDesign'
                        name='pluscircleo'/>
                    </TouchableOpacity>
                </Card>
            )
        }
    }
    postbox(value){
        if(value == 'listado'){
            return(
                <Card transparent>
                    <CardItem>
                        <Input 
                        onChangeText={(price) =>
                        this.onChangedNumber(price)}
                        placeholder={'Precio'}
                        value={this.state.price}
                        editable={!this.state.sendform}
                        style={{width : '75%', borderColor: 'gray'}}/>
                    </CardItem>
                    {this.pickersoptions(this.state.post, this.state.listcategories)}
                </Card>
            )
        } else if(value == 'negocio'){
            return(
                    <Card transparent>
                        {this.pickersoptions(this.state.post, this.state.negocioscategories)}
                    </Card>
            )

        } else if(value == 'servicio'){
            return(
                <Card transparent>
                    {this.pickersoptions(this.state.post, this.state.lservicios)}
                </Card>
            )
        }else if(value == 'vacante'){
            return(
                <Card transparent>
                    <CardItem>
                        <Input 
                        editable={!this.state.sendform}
                        placeholder={'Salario'}
                        style={{width : '75%', borderColor: 'gray'}}/>
                    </CardItem>
                    {this.pickersoptions(this.state.post, this.state.listcategories)}
                </Card>
            )
        }
    }
    pickersoptions(value, pickers){
        if (value == 'listado'){
            return(
                <Card transparent>
                <CardItem>
                    <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined, height: 23 }}
                    selectedValue={this.state.category}
                    onValueChange={this.pickacategory.bind(this)}
                    >
                        {this.pickers(pickers)}
                    </Picker>
                </CardItem>
                <CardItem>
                    <Picker
                    enabled={!this.state.sendform}
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined, height:23 }}
                    selectedValue={this.state.estado}
                    onValueChange={this.estado.bind(this)}
                    >
                    <Picker.Item label="Nuevo" value="Nuevo" />
                    <Picker.Item label="Usado" value="Usado" />
                    </Picker>
                </CardItem>
                </Card>
                
            )
            
        } else if(value == 'negocio'){
            return(
                <Card transparent>
                    <CardItem>
                        <Picker
                        enabled={!this.state.sendform}
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined, height: '100%' }}
                        selectedValue={this.state.category}
                        onValueChange={this.pickacategory.bind(this)}
                        >
                            {this.pickers(pickers)}
                        </Picker>
                    </CardItem>
                </Card>
            )
        } else if(value == 'servicio'){
            return(
                <Card transparent>
                    <CardItem>
                        <Picker
                        enabled={!this.state.sendform}
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined, height: 23 }}
                        selectedValue={this.state.category}
                        onValueChange={this.pickacategory.bind(this)}
                        >
                            {this.pickers(pickers)}
                        </Picker>
                    </CardItem>
                </Card>
            )
        }
    }
    pickers(value){
        return value.map((data, index, array)=>{
            return(
                <Picker.Item label={data} value={data} />
            )
        })
        
    }
}

const styles = StyleSheet.create({
    header :{
        backgroundColor: 'white'
    },
    icons: {
        color: '#c8001d' 
    },
    elementsicons: {
        color:'#c8001d', 
        fontSize: 30
    },
    buttons: {
        backgroundColor: '#c8001d'
    },
    imagesdirection :{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    }
})

const mapStateToProps = state => {
    return {userdata : state.userdata}
  }
  
  export default connect(mapStateToProps, actions)(Newpost)