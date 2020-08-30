import React, {Component} from 'react';
import {Container,  Header, Left, Body, Icon, Picker, 
Form, Card, CardItem, Input, Spinner,
Footer, Text,
Item} from 'native-base'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'
import Post from '../../globalfunctions/globalcomponents/Post'
import { StatusBar } from 'expo-status-bar'
import {connect} from 'react-redux'

class Getallposts extends Component{
    constructor(){
        super();
        this.state ={
            posts : [],
            active : true,
            loadmore: false,
            page: 0, 
            listcategories: ['Ropa y calzado', 'Electronica', 'Hogar', 'Mascotas',
            'Bienes raices', 'Juguetes', 'Autos y transporte', 'Salud y belleza',
            'Deporte'],
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
            estado: 'Nuevo',
            category : '',
            numero: '',
            showmenu : 1,
            find : false,
            finder : '',
            viewall: ''

        }
    }


    async componentDidMount(){
        await this.props.navigation.addListener(
        'willFocus',
        async() => {
            this.refresh()
            await this.Change()
            await this.getposts(this.props.navigation.state.params.dato, this.state.page,this.props.userdata.userdata.location !== null? this.props.userdata.userdata.location: 'global')
        })
    }
    getallorone=(dato)=>{
            this.setState({
                posts: [],viewall : dato, page: 0})
            this.getposts(this.props.navigation.state.params.dato, this.state.page, dato)
    
    }

//Se cambia el parametro de numeros

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
//optenerposts
    getposts = async(category, page, location)=>{
        setTimeout(async()=>{
            if(this.state.active === true && this.state.find === false){
                this.setState({active: false, loadmore: true})
                if(this.state.active === false){
                    this.setState(prevState => ({ page: prevState.page + 1 }));
                    const allposts = await functions.getposts(category, page, location)                                         
                    switch(allposts.response){
                        case true :
                            let arr = allposts.data 
                            if(Array.isArray(arr) && arr.length){
                                let push = this.state.posts.concat(arr)
                                this.setState({posts : push, active: true, loadmore: false})
                            } else{

                                this.setState({active: true, loadmore: false})
                            }
                        break

                    }
                }
            }

        }, 1000)
    }
//buscarposts
    getfindposts = async ()=>{

        if(this.state.find == false){
            this.setState({
                find : true,
                posts: [],
                page: 0
            })
        }

        let advancesearch = false

        if(this.state.showmenu == 2){
            advancesearch = true
        }
        
        setTimeout(async()=>{
            if(this.state.active == true && this.finder.length !== 0){
                this.setState({active: false, loadmore: true})
                this.setState(prevState => ({ page: prevState.page + 1 }));
                const allposts = await functions.getfindpost(this.props.navigation.state.params.dato, 
                                                            this.state.estado, this.state.category, 
                                                            this.state.numero , this.state.page,
                                                            this.state.finder, advancesearch)
                switch(allposts.response){
                    case true :
                        let arr = allposts.data 
                        if(Array.isArray(arr) && arr.length){
                            let push = this.state.posts.concat(arr)
                            this.setState({posts : push, active: true, loadmore: false})
                        }
                    break    
                }
            }

        }, 1000)
    }
//se cambian estados y categorias
    estado(value){
        this.setState({estado : value})
    }

    changecategory(value){
        this.setState({category : value})
    }
// se cambia el menu dependiendo de los valores
    Change = (value) =>{
        switch(value){
            case 'listado':
                this.setState({category : 'Ropa y Calzado' , estado : 'Nuevo'})
            break
            case 'negocio': 
                this.setState({category : 'Animales', estado : ''})
            break
            case 'servicio':
                this.setState({ category : 'Abogado', estado : ''})
            break
            case 'vacante':
                this.setState({ estado : '',category: ''})
        }
    }

// se regresan los datos a su estado original    
    refresh = async() =>{
        await this.setState({
            posts : [],
            active: true,
            loadmore: false,
            page: 0,
            showmenu: 1,
            finder : '',
            find:false,
            viewall: this.props.userdata.userdata.location !== null?
            this.props.userdata.userdata.location:'global'
        })
    }


    render(){
        return(
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity
                        onPress={()=>{
                            this.refresh()
                            this.props.navigation.navigate('Home')}}>
                            <Icon
                            type="Ionicons"
                            name="arrow-back"
                            style={styles.icons}
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body></Body>
                </Header>
                    {this.finder(this.props.navigation.state.params.dato)}
                    { this.props.userdata.userdata.location !== null
                    ? 
                    <View style={{width: '100%', alignItems: 'center'}}>
                            {this.state.viewall == this.props.userdata.userdata.location
                            ?
                            <TouchableOpacity
                                onPress={()=>{
                                    this.getallorone('global')
                                }}
                            >
                            <Text style={{color: '#c8001d'}}>
                                Ver todo
                            </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={()=>{
                                    this.getallorone(this.props.userdata.userdata.location)
                                }}
                            >
                            <Text style={{color: '#c8001d'}}>
                                En mi ubicación
                            </Text>
                            </TouchableOpacity>
                            }
                    </View>
                    :
                    <View style={{width: '100%', alignItems: 'center'}}>
                            <Text style={{color: '#c8001d'}}>
                                Configura tu ubicación para resultados especificos
                            </Text>
                    </View>
                    }
                    <Post
                    navigation={this.props.navigation}
                    load={this.getposts.bind(this)}
                    posts={this.state.posts}
                    refresh={this.refresh.bind(this)}
                    find={this.state.find}
                    refreshfind={this.getfindposts.bind(this)}
                    />
                 <Toast ref="toast"/>
                 {this.Myfooter(this.state.loadmore)}
                 <StatusBar style="light" />
            </Container>
        )
    }

    finder(type){
        return(
            <Card>
                <Form>
                    <Item>
                        <Input
                        onChangeText={(finder) =>
                        this.setState({finder})}
                        placeholder={`Buscar en ${type}s`}></Input>
                        <TouchableOpacity onPress={()=>{
                            this.setState({
                                find : true,
                                posts: [],
                                page: 0
                            })
                            this.getfindposts()}}>
                        <Icon
                        type={'Entypo'}
                        name={'magnifying-glass'}
                        style={styles.icons}
                        ></Icon>
                        </TouchableOpacity>
                    </Item>
                </Form>
                {this.Fmenu(type)}
                <Card
                style={{alignItems : 'center'}} 
                transparent>
                    <TouchableOpacity
                    onPress={()=>{
                        if(this.state.showmenu == 1){
                            this.setState({showmenu : 2})
                        }else{
                            this.setState({showmenu : 1})
                        }}}>
                        { this.state.showmenu == 1
                        ?       
                        <Icon
                        type="MaterialIcons"
                        name="keyboard-arrow-down"
                        ></Icon>
                        :       
                        <Icon
                        type="MaterialIcons"
                        name="keyboard-arrow-up"
                        ></Icon>
                        }
                    </TouchableOpacity>
                </Card>
            </Card>
        )
    }

    Fmenu(type){
        if (type == 'listado' && this.state.showmenu == 2){
            return(
                <Card transparent>
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
                        <Picker
                        enabled={!this.state.sendform}
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined, height:23 }}
                        selectedValue={this.state.category}
                        onValueChange={this.changecategory.bind(this)}
                        >
                            {this.categories(this.state.listcategories)}
                        </Picker>
                    </CardItem>
                    <CardItem>
                        <Input
                        onChangeText={(price) =>
                        this.onChangedNumber(price)}
                        value={this.state.numero} 
                        placeholder={'Establece un limite de precio'}></Input>
                    </CardItem>
                </Card>
            )
        }else if(type == 'negocio' && this.state.showmenu == 2){
            return(
                <Card transparent>
                    <CardItem>
                        <Picker
                        enabled={!this.state.sendform}
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined, height:23 }}
                        selectedValue={this.state.category}
                        onValueChange={this.changecategory.bind(this)}
                        >
                            {this.categories(this.state.negocioscategories)}
                        </Picker>
                    </CardItem>
                </Card>
            )
        }else if(type == 'servicio' && this.state.showmenu == 2){
            return(
                <Card transparent>
                    <CardItem>
                        <Picker
                        enabled={!this.state.sendform}
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined, height:23 }}
                        selectedValue={this.state.category}
                        onValueChange={this.changecategory.bind(this)}
                        >
                            {this.categories(this.state.lservicios)}
                        </Picker>
                    </CardItem>
                </Card>
            )
        }
    }

    categories(catego){
        return catego.map((data, index, array)=>{
            return(
                <Picker.Item label={data} value={data} />
            )
        })
    }

    Myfooter(load){
        if (load == true){
            return(
                <Footer style={{backgroundColor : 'transparent', alignItems: 'center'}}>
                    <Spinner color="red"/>
                </Footer>
            )
        }
    }
}

const styles = StyleSheet.create({
    header : {
        backgroundColor: '#c8001d',
        marginTop:15
    },
    icons :{
        color : 'white',
        marginTop: 9
    }
})

const mapStateToProps = state => {
  return {userdata : state.userdata}
}

export default connect(mapStateToProps)(Getallposts)