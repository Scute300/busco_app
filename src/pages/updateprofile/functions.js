import axios from 'axios'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Alert, AsyncStorage }  from 'react-native';
import * as Location from 'expo-location';

  
const gkey = 'AIzaSyBNwCV021BQBYb9VQNjJWnocPCqcWfpmZk'
const url = 'https://buscoapp.herokuapp.com/api/v2/account'
const getprofilepicturepreview = async()=>{
    let r ={response : false}
    let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(status !== "granted"){
        Alert.alert('Necesitamos permiso para acceder a esta funcion')
        return r
    } else {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            base64: true
        })
        if( result.cancelled !== true){
            let base64 = `data:image/jpg;base64,${result.base64}`
            let r = {response : true, imageuri : result.uri, base64 : base64}
            return r
        } else {
            return r
        }
    }
}

const changeavatar = async(base64) => {
    let r = {response : false}
    const token = await AsyncStorage.getItem('user-token')
    await axios.put(url+'/changeavatar', {
        avatar: base64
    },{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
    .then(response => {
        r = {response : true, data: response.data.data}
    }).catch(error => {
        r={response: false, error: error.response.data}
    })
    return r
}

const location = async() => {
    let r = {response : false}
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted'){
        Alert.alert('Necesitamos permiso para acceder a tu ubicación')
        return r
    } else {
        let location =  await Location.getCurrentPositionAsync ({enableHighAccuracy: true});
        let lat = location.coords.latitude
        let lng = location.coords.longitude
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&components=country&key=${gkey}`)
        .then(response =>{
            let ubicacion = response.data.plus_code.compound_code.slice(8)
            console.log(response)
            r = {response : true, data : ubicacion}
        }).catch(error => {
            console.log(error)
            r = {response : false, data : 'En este momento no se puede acceder a tu ubicación'}
        })
        if(r.response == true){
            const token = await AsyncStorage.getItem('user-token')
            await axios.put(url+'/changelocation', {
                location : r.data
            },{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
            .then(response =>{
                r={response : true, data: response.data.data}
            }).catch(error =>{
                r= {response : false, data: error.response.data.message}
                console.log(r)
            })
            return r
        } else {
            return r
        }
    }
}
const updatedata = async(name, cumpleaños, bio)=>{
    const token = await AsyncStorage.getItem('user-token')
    let r ={response : false}
    await axios.put(url+'/updateprofile',{
        name: name,
        cumpleaños : cumpleaños,
        bio: bio
    },{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
    .then(response =>{
        r = {response : true, data: response.data.data}
    }).catch(error =>{
        r= {response : false, data : error.response.data.message}
    })
    return r
}

const verifypassword = async(password) =>{
    const token = await AsyncStorage.getItem('user-token')
    let r = {response : false}
    await axios.post(url + '/verify',{
        password: password
    },{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
    .then(response =>{
        r = {response : true}
    }).catch(error =>{
        r = {response : false}
    })
    return r
}

const aemail = async(email)=>{
    const token = await AsyncStorage.getItem('user-token')
    let r = {response : false}
    await axios.put(url+'/modifyemail', {
        email: email
    },{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
    .then(response => {
        r={response: true}
    }).catch(error =>{
        r = {response : false, data : error.response.data.message}
    })
    return r
}

const apassword = async(password)=>{
    const token = await AsyncStorage.getItem('user-token')
    let r = {response : false}
    await axios.put(url+'/modifypassword', {
        password: password
    },{headers: {Authorization: `Bearer ${token}`}, timeout:60000})
    .then(response => {
        r={response: true}
    }).catch(error =>{
        r = {response : false, data : error.response.data.message}
    })
    return r
}


export default {getprofilepicturepreview, changeavatar, location, 
    updatedata, verifypassword, aemail, apassword}