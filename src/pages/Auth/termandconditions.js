import React, {Component} from 'react';
import {Container, Content, Icon, Title, Thumbnail, 
Header, Left, Body,Form, Item,Input, Button, Text, Spinner} from 'native-base'
import {View, StyleSheet, ToastAndroid, BackHandler} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import functions from './functions'
import Toast, {DURATION} from 'react-native-easy-toast'
import { StatusBar } from 'expo-status-bar'


export default class Termns extends Component{
    constructor(){
        super()
        this.state = {

        }
    }


    render(){
        return(
            <Container>
            <Header style={styles.header}>
                <Left>
                    <TouchableOpacity
                    onPress={()=>{
                            this.props.navigation.goBack()
                    }}>
                        <Icon
                        style={styles.icon}
                        type='Ionicons'
                        name='arrow-back'
                        />  
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Title
                    style={{color : '#c8001d'}}
                    >Terminos y condiciones</Title>
                </Body>
            </Header>
            <Content>
                <Text>
    1. Aceptación de Términos de Uso y de las enmiendas 

Cada vez que usted utiliza o accede a esta Página Web o la aplicación (buscoapp.com), está aceptando ser limitado por estos Términos de Uso y según la enmienda prevista, ya que es un contrato consensual, que basta con el perfeccionamiento, el consentimiento de los contratantes sobre los elementos esenciales de los términos y prestaciones de servicios.
2. TERMINOS Y CONDICIONES EN GENERAL DE LA PAGINA WEB (buscoapp.com).
    1) (buscoapp.com). NO SE HACE RESPONSABLE DE ALGUN PRODUCTO/SERVICIO DEFECTUOSO, IMPERFECTO, ETC.
    2) NO PODRA RECLAMAR A LA PAGINA WEB/APLICACION POR CUALQUIER PRODUCTO/SERVICIO QUE NO LLENE SUS EXPECTATIVAS.
3. Nuestro Servicio
Usted conviene que el dueño de esta Página Web/aplicación se reserven exclusivamente el derecho y pueda, en cualquier momento con o sin aviso y sin ninguna responsabilidad hacia usted, a modificar o descontinuar el uso esta Página/aplicación y sus servicios o suprimir los datos que usted proporcione, temporal o permanentemente. No tendremos ninguna responsabilidad por la puntualidad, la cancelación, la falta de almacenaje, la inexactitud, o la entrega incorrecta de datos o información
4. Política De Privacidad
Los datos de registro y toda información que llegáramos a recoger de usted y que lo identifique como información personal, como lo son sus nombre y apellidos completos, su edad y dirección donde habita, están respaldados por nuestros Términos de Política de Privacidad (buscoapp.com).

5. Su conducta
Usted acuerda que no puede:
    a) Subir ningún contenido ilegal, amenazante, dañina, abusiva, acosadora, acechadora, torturadora, difamatoria, vulgar, obscena, ofensiva, desagradable, pornográfica.
    b) Abrir varias cuentas.
    c) Publicar anuncios en categoría incorrecta.
    d) Subir anuncios que son:
        a. Productos robados.
        b. Material explosivo.
        c. Órganos, restos o residuos humanos.
        d. Artículos de contrabando. Falsificados o adulterados o replicas.
        e. Contenido política.


                </Text>
            </Content>
            <StatusBar style="light" />
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
        color : '#c8001d',
        marginTop: 15
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