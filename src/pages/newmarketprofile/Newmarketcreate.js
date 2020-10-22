import React, { Component } from 'react'
import { ImageBackground,View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import {Container, Content, Text, Header, Left, Body, Icon, Card,
CardItem, Button, Thumbnail, Form, Item, Input, Label, Picker, Textarea,
Root, Toast, Spinner} from 'native-base'
import functions from './functions/functions'
export default class Newmarketcreate extends Component {
    constructor(){
        super();
        this.state = {
            categorias: [
                'Abogado',
                'Agente De Seguros',
                'Agente De Viajes',
                'Albañil',
                'Arquitecto',
                'Cantante',
                'Chófer',
                'Contador',
                'Dentista',
                'Diseñador',
                'Doctor',
                'Electrico',
                'Empleado/Empleada De Casa',
                'Entrenador',
                'Fotógrafo',
                'Guía De Turistas',
                'Ingeniero Civil',
                'Jardinero',
                'Mecanico',
                'Músico',
                'Peluquero',
                'Pintor',
                'Plomero',
                'Sastre',
                'Tecnico',
                'Veterinario',
                'Restaurate',
            ],
            tags : [],
            nombre_negocio: '',
            logo: {base64: '', url: ''},
            portada: {base64:'', url: ''},
            categoria: 'Abogado',
            descripcion: '',
            telefono: '',
            tiposervicio: '',
            tag: '',
            sendform: false
        }
    }

    seleccionarcategoria(categoria){
        this.setState({categoria : categoria})
    }
    seeleccionartipo(tipo){
        this.setState({tiposervicio: tipo})
    }
    pushgategorie(){
        if(this.state.tag !== ''){
            let arr = this.state.tags
            arr.push(this.state.tag)
            this.setState({tags: arr, tag: ''})
        }else{
            Alert.alert('Escribe un tag')
        }
    }

    removearray = (index)=>{
        let arr = this.state.tags
        arr.splice(index, 1)
        this.setState({tags: arr})
    }

    cambiarimagen = async(type)=>{
        const logo = await functions.cambiarimagen()
        switch(logo.response){
            case true : 
                if(type == 'logo'){
                    this.setState({logo: {base64: logo.base64, url: logo.image}})
                } else{
                    this.setState({portada: {base64: logo.base64, url: logo.image}})
                }
            break;
            case false:
            break;
        }
    }

    send = async()=>{
        this.setState({sendform: true})
        const subir = await functions.subirnegocio(this.state.logo.base64,
            this.state.portada.base64,this.state.nombre_negocio, this.state.categoria,this.state.descripcion,
            this.state.tags, this.state.telefono, this.state.tiposervicio)

            switch(subir.response){
                case true:
                    Alert.alert('Ahora puedes acceder y administrar tu negocio')
                    this.props.navigation.navigate('AuthLoading')
                break;
                case false: 
                this.setState({sendform: false})
                Toast.show({
                    text: subir.error,
                    buttonText: 'Okay'
                })
                break;
            }
    }
    render() {
        return (
                <Container>
                <Root>
                    <Header style={styles.header}>
                        <Left>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
                                <Icon
                                style={styles.icon}
                                type="AntDesign"
                                name="arrowleft"
                                />
                            </TouchableOpacity>
                        </Left>
                        <Body/>
                    </Header>
                    <Content>
                        <View style={styles.headerimage}>
                            <ImageBackground source={{uri: this.state.portada.url == '' ? 'https://fomantic-ui.com/images/wireframe/image.png':
                            this.state.portada.url}} style={{flex: 1, padding: 10}}>
                                <View style={styles.changeheadericoncontainer}>
                                    <TouchableOpacity onPress={()=>{
                                        this.cambiarimagen('portada')
                                    }}>
                                        <Icon
                                        type="AntDesign"
                                        name="upload"
                                        style={styles.iconcolor}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.avatarcontainer}>
                            <View>
                                <Thumbnail
                                rounded
                                large
                                source={{uri: this.state.logo.url == '' ? 'https://s1.logaster.com/static/v3/img/products/logo.png' : this.state.logo.url}}
                                style={styles.avatar}
                                />
                                <View style={styles.iconeditavatarcontainer}>
                                    <TouchableOpacity onPress={()=>{
                                        this.cambiarimagen('logo')
                                    }}>
                                        <Icon
                                        style={styles.iconeditavatar}
                                        type="Feather"
                                        name="edit"
                                        style={styles.iconcolor}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Form style={{padding: 2}}>
                            <View style={styles.label}>
                                <Text note>
                                    ¿Como se llama tu negocio?
                                </Text>
                            </View>
                            <Item picker>
                                <Input
                                onChangeText={(nombre_negocio)=>{
                                    this.setState({nombre_negocio})
                                }}
                                placeholder="Nombre del negocio"
                                />
                            </Item>
                            <View style={styles.label}>
                                <Text note>
                                    Telefono del negocio
                                </Text>
                            </View>
                            <Item picker>
                                <Input
                                onChangeText={(telefono)=>{
                                    this.setState({telefono})
                                }}
                                keyboardType="number-pad"
                                placeholder="Un numero telefónico"
                                />
                            </Item>
                            <View style={styles.label}>
                                <Text note>
                                    Categoria
                                </Text>
                            </View>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    onValueChange={this.seleccionarcategoria.bind(this)}
                                    selectedValue={this.state.categoria}
                                >
                                    <Picker.Item label="Seleccionar categoría" value=""/>
                                    {this.categorie()}
                                </Picker>
                            </Item>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    onValueChange={this.seeleccionartipo.bind(this)}
                                    selectedValue={this.state.tiposervicio}
                                >
                                    <Picker.Item label="Tipo de negocio" value=""/>
                                    <Picker.Item label="Negocio" value="negocio"/>
                                    <Picker.Item label="Servicio" value="servicio"/>
                                </Picker>
                            </Item>
                            <View style={styles.label}>
                                <Text note>
                                    Tags
                                </Text>
                            </View>
                            <Item picker>
                                <Input
                                onChangeText={(tag)=>{
                                    this.setState({tag})
                                }}
                                value={this.state.tag}
                                placeholder="Añade algunos tags"
                                />
                                <TouchableOpacity
                                onPress={()=>{this.pushgategorie()}}>
                                    <Icon
                                    type="AntDesign"
                                    name="plus"
                                    style={styles.iconcolor}
                                    />
                                </TouchableOpacity>
                            </Item>
                            <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', padding: 5}}>
                                {this.tags()}
                            </View>
                            <View style={styles.label}>
                                <Text note>
                                    Describe tu negocio
                                </Text>
                            </View>
                            <Textarea 
                                onChangeText={(descripción)=>{
                                    this.setState({descripción})
                                }}
                            rowSpan={5} bordered placeholder="¿Como es tu negocio?" />
                            <Button 
                            disabled={this.state.sendform}
                            onPress={async()=>{await this.send()}}
                            full style={styles.header}>
                                { this.state.sendform == false
                                ?
                                <Text>
                                    Publicar mi negocio
                                {'   '}
                                <Icon
                                type="Entypo"
                                name="location"
                                style={{color: 'white', fontSize: 15}}
                                />
                                </Text>
                                :
                                <Spinner color="white"/>
                                }
                            </Button>
                        </Form>
                    </Content>
                </Root>
                </Container>
        )
    }

    categorie(){
        return this.state.categorias.map((data)=>{
            return (
                <Picker.Item label={data} value={data} />
            )
        })
    }

    tags(){
        return this.state.tags.map((data, index)=>{
            return (
                <TouchableOpacity onPress={()=>{
                    this.removearray(index)
                }}>
                    <View style={{padding: 3, backgroundColor : '#c8001d', borderRadius:3, margin: 3}}>
                        <Text style={{fontSize: 10, color: 'white'}}>
                            {data}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#c8001d'
    },
    icon: {
        fontSize: 36,
        color : 'white',
        marginTop: 15
    },
    headerimage: {
        width: '100%',
        height: 220,
    },
    changeheadericoncontainer:{
        width :'100%',
        alignItems : 'flex-end'
    },
    iconcolor: {
        color: '#c8001d'
    },
    avatarcontainer: {
        width: '100%',
        alignItems: 'center',
        bottom: 60
    },
    avatar :{
        backgroundColor: 'white', 
        width: 120, 
        height: 120, 
        borderRadius: 100,
        borderWidth: 3,
        borderColor: 'white',
    },
    iconeditavatarcontainer: {
        position: 'absolute',
        left: 90
    },
    label : {
        width: '100%',
        paddingHorizontal: 10
    }
})