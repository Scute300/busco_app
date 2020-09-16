import axios from 'axios'
import {AsyncStorage} from 'react-native'
import baseurl from '../../globalfunctions/baseurl'

export default class User{
  
    constructor(type , token){
        this.type = type
        this.token = token
      }
  
    async register(){
    let r ={response: false, token : null, error : ''}
        await axios.post(baseurl+'v1/login', {
            token:this.token,
            type: this.type
        }).then(response=>{
            r = {response : true, token : response.data.token, error: ''}
        }).catch(error =>{
            r = {response : false, token : null, error: error.response.data.message}
        })
        if(r.token !== null){
            await AsyncStorage.clear()
            await AsyncStorage.setItem('usertoken', `{"type": "${this.type}", "token" : "${r.token}"}`)
        }
        return r
    }
}