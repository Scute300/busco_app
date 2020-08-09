
import axios from 'axios'
import { Alert }  from 'react-native';
import { AsyncStorage, Image, View, ToastAndroid }  from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

const url = 'https://buscoapp.herokuapp.com/api/v2/post'

const image = async()=>{
    let r = {response: false}
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(status !== "granted"){
        Alert.alert('¡Necesitas dar permisos para acceder a esta función!')
        return r
    } else {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            base64: true
        })
        if(result.cancelled !== true){
            let base64 = `data:image/jpg;base64,${result.base64}`
            r = {response: true, image : result.uri, base64: base64}
            return r
        } else {
            return r    
        }
    }
} 

const subir = async(type, text, name, images, category, location, price, status)=>{
    let r = {response : false}
    const token = await AsyncStorage.getItem('user-token')
    await axios.post(url+'/newpost', {
        type: type,
        name: name,
        text :text, 
        images : images,
        category: category,
        location: location,
        price: price,
        status: status
    },{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
    .then(response => {
        r ={response : true, data: response.data.data}
    }).catch(error => {
        r = {response : false, data: error.response.data.message}
    })
    return r
}

const getcurriculum = async(user)=>{
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(status !== 'grantend'){
        Alert.alert('Necesitas permisos para subir tu curriculum')
    } else{
    const result = await DocumentPicker.getDocumentAsync({type: "application/pdf", copyToCacheDirectory: true});
    if(result.type == 'success'){
        const token = await AsyncStorage.getItem('user-token')
        
            const data = await new FormData()
            await data.append('cv', {
                uri: result.uri,
                type: 'application/pdf', 
                name: user
            })
            let r = {response : false}
            
            await axios.post('https://buscoapp.herokuapp.com/curriculum',
            data,{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
            .then(response=> { 
                r = {response : true, data: response.data.data}
            }).catch(error => {
                r = {response : false}
            })

            if(r.response == true){
                await axios.post(url+'/newcv',{
                    image : r.data
                },{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
                .then(response =>{
                    r = {response : response.data.status, data: response.data.data }
                }).catch(error =>{
                    r= {response : false}
                    console.log(error)
                })
            }
           return r
        }   
    }
    
}

export default {image, subir, getcurriculum}