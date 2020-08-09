import axios from 'axios'
import {AsyncStorage} from 'react-native'
    import { Form } from 'native-base'

const send = async(dato, report) => {
    const token = await AsyncStorage.getItem('user-token')
    let r = {response : false}
    await axios.post('https://buscoapp.herokuapp.com/api/v2/post/report/'+dato, {
        report: report
    },{headers: {Authorization: `Bearer ${token}`}, timeout:60000}).then(response => {
        r= {response : true, data: response.data.data}
    }).catch(error => {
        r = {response : false, data: error.response.data.message}
    })
    
    return r
}

const sendcv = async(dato, report) => {
    const token = await AsyncStorage.getItem('user-token')
    let r = {response : false}
    await axios.post('https://buscoapp.herokuapp.com/api/v2/post/reportcv/'+dato, {
        report: report
    },{headers: {Authorization: `Bearer ${token}`}, timeout:60000}).then(response => {
        r= {response : true, data: response.data.data}
    }).catch(error => {
        r = {response : false, data: error.response.data.message}
    })
    
    return r
}



export default {send,sendcv}