import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Alert} from 'react-native'

const location = async()=>{
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted'){
        Alert.alert('Para esto es necesario acceder a tu ubicación')
        return {response: false}
    } else {
        let location = await Location.getCurrentPositionAsync();
        return {response : true, lat: location.coords.latitude, lng : location.coords.longitude}
    }
}

export default {location}