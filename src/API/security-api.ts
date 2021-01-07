import { instance } from './api';




export const securityAPI = {
    getCapchaUrl (){
        return instance.get<SecurityResponceType>('security/get-captcha-url').then(res=>res.data)
    }
}


type SecurityResponceType = {
    url:string
}