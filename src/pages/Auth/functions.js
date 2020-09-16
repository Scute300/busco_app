import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth';
import User from './newuserclass'

const loginbygoogle = async()=>{
  
    const { type, accessToken } = await Google.logInAsync({
      iosClientId: `241384812318-jkqii5t5md76rulf4rvmu42e07v663jk.apps.googleusercontent.com`,
      androidClientId: `241384812318-tv05e0n36tq8575ed36c27i6ac7lh9sc.apps.googleusercontent.com`,
    });
    if(type == 'success'){
        const register = await new User('go', accessToken)
        .register()
        return register
    } else{
      return  {response : false, token : null, error: 'Necesitamos tu permiso para acceder', user:null}
    }
}

const loginbyfacebook = async()=>{
    await Facebook.initializeAsync('1030311570738829');
    const {type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
          const register = await new User('fb', token)
          .register()
          return register
    }else{
      return {response : false, token : null, error: 'Necesitamos tu permiso para acceder', user:null}
    } 
    
}





export default {loginbygoogle, loginbyfacebook}