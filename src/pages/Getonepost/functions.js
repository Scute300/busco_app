import axios from 'axios'
import {AsyncStorage} from 'react-native'

const baseurl = 'https://buscoapp.herokuapp.com/api/v1'

const getpost = async(id) =>{
    let r = {response : false}

    await axios.get(baseurl+'/onepost/'+id)
    .then(response => {
        r = {response : true , data : response.data.data}
    }).catch(error =>{
        r = {response : true , data : error.response.data.status}
    })
    return r
}

const deletepost = async(id) =>{
    const token = await AsyncStorage.getItem('user-token')
    let r = {response : false}
    await axios.delete('https://buscoapp.herokuapp.com/api/v2/post/deletepost/'+id
    ,{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
    .then(response => {
        r = {response : true, data: response.data.data}
    }).catch(error => {
        r = {response : false, data: error.response.data.message}
        console.log(r.data)
    })
    return r
}

export default {getpost, deletepost}