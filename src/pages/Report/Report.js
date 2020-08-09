import functions from './functions'
import React, {Component} from 'react';
import {Container, Content, 
Header, Left, Body, Icon, 
Form, Text, Card, Textarea, Button,
Item, Spinner} from 'native-base'
import {Animated, StyleSheet, 
View, TouchableOpacity} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'

export default class Report extends Component{
    constructor(){
        super()
        this.state = {
            sendreport: false,
            report: ''

        }
    }


    reportar = async()=>{
        if(this.state.sendreport == false){
            this.setState({sendreport : true})
            const response = await functions.send(this.props.navigation.state.params.dato, this.state.report)
            switch(response.response){
                case true : 
                await this.refs.toast.show(response.data);
                this.props.navigation.navigate('AuthLoading')
                break
                case false :
                    this.refs.toast.show(response.data);
                    this.setState({sendreport: false})
                break
            }
        }
    }
    render(){
        return(
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity>
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
                    <Card transparent>
                        <Form>
                            <Item>
                                <Textarea
                                onChangeText={(report) =>
                                this.setState({report})}
                                maxLength={300}
                                placeholder={'Escribe la razón de tu reporte'}
                                />
                            </Item>
                            <Button 
                            disabled={this.state.sendreport}
                            onPress={this.reportar}
                            style={styles.button} full>
                                {this.state.sendreport == false
                                ?
                                <Text>
                                    Enviar reporte
                                </Text>
                                :
                                <Spinner
                                color='white'
                                />
                                }
                            </Button>
                        </Form>
                    </Card>
                </Content>
                 <Toast ref="toast"/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header : {
        backgroundColor: 'white'
    },
    icons :{
        color : '#c8001d'
    },
    button: {
        backgroundColor :'#c8001d'
    }
})