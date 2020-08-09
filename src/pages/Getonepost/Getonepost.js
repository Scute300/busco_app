import React, {Component} from 'react';
import {Container, Content, 
Header, Left, Body, Icon, 
Text, Card, CardItem, 
Thumbnail,  Spinner,
Right} from 'native-base'
import {connect} from 'react-redux'
import {Animated, StyleSheet, 
View, TouchableOpacity, Image
, Linking} from 'react-native'
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'


class Getonepost extends Component {
    constructor(){
        super()
        this.state={
            status : 'cargando',
            post : null,
            images : []
        }
    }

    UNSAFE_componentWillMount(){
        this.loading()
        this.props.navigation.addListener(
        'willFocus',
        () => {
            
            this.setState({
                status : 'cargando',
                post : {},
                images : []
            })
        this.loading()
        })
    }

    loading = async()=>{
        const data = await functions.getpost(this.props.navigation.state.params.dato)
        switch(data.response) {
            case true :
                this.setState({post: data.data, images :data.data.images , status: 'sure'})
            break
            case false :
                this.setState({status : 'error'})
        }
    }

    sendwathsapp = ()=>{
        Linking.openURL(
          `https://wa.me/52${this.state.post.user.number}/?text=Hola%20me%20interesa%20tu%20${this.state.post.type}%20en%20Busco,`
        );
    }

    call = ()=>{
        Linking.openURL(
          `tel://${this.state.post.user.number}`
        );
    }

    deletepost = async()=>{
        if(this.state.status == 'sure'){
            this.setState({status : 'cargando'})
            const erase = await functions.deletepost(this.props.navigation.state.params.dato)
            switch(erase.response){
                case true :
                    this.refs.toast.show(erase.data);
                    this.props.navigation.navigate('AuthLoading')
                break
                case false :
                    this.refs.toast.show(erase.data);
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
                    onPress={()=>{
                        let dato = this.state.post.type
                        this.setState({
                            status : 'cargando',
                            post : {},
                            images : []
                        })
                        this.props.navigation.navigate('Getallpost', {dato})
                    }}>
                        <Icon
                        type="Ionicons"
                        name="arrow-back"
                        style={styles.icons}
                        />
                    </TouchableOpacity>
                </Left>
                <Body/>
            </Header>
            <Content>
                {this.pantallas(this.state.status, this.state.post)}
            </Content>
            <Toast ref="toast"/>
            </Container>
        )
    }
    pantallas(status, post){
        if(status == 'cargando' || post == null){
            return(
                <View style={styles.vcontainer}>
                    <Spinner
                    color='red'
                    />
                </View>
            )
        }else if(status == 'error'){
            return(
                <View style={styles.vcontainer}>
                    <Text>
                        Error 404 Pagina no encontrada
                    </Text>
                </View>
            )
        } else if(status == 'sure' && post !==  null){
            return(
                <Card transparent>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: this.state.post.user.avatar}} />
                            <Body>
                                <Text>{this.state.post.user.username}</Text>
                                { this.state.post.user.location == null
                                ?
                                <Text note>{this.state.post.location}</Text>
                                :
                                <Text note>{this.state.post.user.location}</Text>
                                }
                            </Body>
                        </Left>

                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                {this.state.post.text}
                            </Text>
                        </Body>
                    </CardItem>
                    {this.images(this.state.images)}
                    {this.category(this.state.post.type, this.state.post)}
                    <CardItem>
                    <Left>
                        <TouchableOpacity
                            onPress={this.call}>
                            <Icon 
                            style={styles.icons}
                            type="FontAwesome"
                            name="phone"
                            />
                        </TouchableOpacity>    
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                        <TouchableOpacity
                        onPress={this.sendwathsapp}
                        >
                            <Icon 
                            style={{fontSize : 30, color : '#c8001d' }}
                            type="FontAwesome"
                            name="whatsapp"
                            />
                        </TouchableOpacity>
                    </Right>
                    </CardItem>
                    {this.postfooter(this.state.post.user.id)}
                </Card>
            )
        }
    }
    postfooter(value){
        if( value !== this.props.userdata.userdata.id && this.props.userdata.isonline == true){
            return(
                <Card transparent style={{alignItems: 'center'}}>
                    <TouchableOpacity
                    onPress={()=>{
                        let dato = this.state.post.id
                        this.props.navigation.navigate('Report', {dato})
                    }}>
                        <Text
                            style={styles.icons}>
                            Reportar
                        </Text>
                    </TouchableOpacity>
                </Card> 
            ) 
        } else if(value == this.props.userdata.userdata.id && this.props.userdata.isonline == true) {
            return(
                <Card transparent style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={this.deletepost}>
                        <Text
                            style={styles.icons}>
                            Eliminar
                        </Text>
                    </TouchableOpacity>
                </Card>
            )
        }
    }

    images(value){
        return value.map((data)=>{
            return(
                 <CardItem cardBody>
                     <Image
                     source={{uri : data.url}}
                     style={{height: 200, width: null, flex: 1}}
                     />
                 </CardItem>
            )
        })
    }
    category(status, options){
        if(status == 'listado'){
            return(
                <Card transparent>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text note>{options.status}</Text>
                            <Text note>{options.category}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text note>{options.price}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            )
        }else if(status == 'negocio' || 'servicio'){
            return(
                <Card transparent>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text note>{options.category}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                )
        } else if(status == 'vacante'){
            return(
                <Card transparent>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text note>{options.price}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            )
        }
    }
}

const styles = StyleSheet.create({
    vcontainer : {
        alignItems : 'center', 
        justifyContent : 'center'
    },
    header : {
        backgroundColor : 'white'
    },
    icons :{
        color : '#c8001d'
    }
})

const mapStateToProps = state => {
    return {userdata : state.userdata}
  }
  
export default connect(mapStateToProps)(Getonepost)