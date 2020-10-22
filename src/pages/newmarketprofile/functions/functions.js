import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {Alert, AsyncStorage} from 'react-native'
import axios from 'axios'
import * as Location from 'expo-location';
import baseurl from '../../../globalfunctions/baseurl'

const cambiarimagen = async()=>{
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(status !== 'granted'){
        Alert.alert('Necesitamos permisos para acceder a esta función')
    } else {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            base64: true
        })
        if(result.cancelled !== true){
            let base64 = `data:image/jpg;base64,${result.base64}`
            return {response: true, image : result.uri, base64: base64}
        } else {
            return {response: false}    
        }
    }
}

const subirnegocio = async(logo, portada,nombrenegocio,categoria,
    descripcion,tags,telefono,tipo)=>{
        const token = await AsyncStorage.getItem('usertoken')
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            return {response: false, error: 'Necesitamos acceder a tu ubicación para acceder a esta función'}
        } else {
            let location = await Location.getCurrentPositionAsync({accuracy: 5});
            const respuesta = await axios.post(baseurl+'v2/nuevonegocio',{
                logo: logo,
                portada: portada,
                nombre_negocio: nombrenegocio,
                categoria: categoria,
                descripcion: descripcion,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                tags: tags,
                telefono: telefono,
                tiposervicio: tipo
            }, {headers: {Authorization: token}}).then(response=>{
                return {response: true}
            }).catch(error=>{
                console.log(error.response.data)
                return{response: false, error: error.response.data.message.message}
            })
            return respuesta
        }


}

export default {cambiarimagen, subirnegocio}