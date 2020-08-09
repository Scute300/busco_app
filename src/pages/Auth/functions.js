import {AsyncStorage} from 'react-native'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

var baseurl= 'https://buscoapp.herokuapp.com/api/v1/'

const login = async(email, password)=>{
    let r = {response: false}
    const connection = await NetInfo.fetch()
    if(connection.isConnected == true){
        await axios.post(baseurl+'login', {
            email: email,
            password : password
        })
        .then(response => {
            r= {response: true, token : response.data.data.token}
        }).catch(error =>{
            r= {response: false, error :error.response.data.message.message}
        })
        if(r.response == true ){
            await AsyncStorage.setItem('user-token', r.token)
            return r
        } else {
            return r
        }
    } else {
        r = {response : 'error'}
        return r
    }
}

const signup = async(nombre, username, number, email, password, confirmpassword)=>{
    if(password == confirmpassword){
        let token = null
        let err = null
        let res = {response : false}
        await axios.post(baseurl+'signup',{
            name:nombre,
            username: username,
            number: number,
            email: email,
            password: password

        }).then(response =>{
            res = {response : true, token:token = response.data.data.token}
            
        }).catch(error => {
            res = {response : false, token:token, error:error.response.data.message}
            
        })
        if(res.response == true){
            let newtoken = res.token
            await AsyncStorage.setItem('user-token',newtoken)
            return res
        } else{
            return res
        }
    } else{
        res = {response : 'error'}
        return res
    }
}


export default {login, signup}