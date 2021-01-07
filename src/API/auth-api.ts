import { APIResponseType, instance } from './api';


export const autchAPI = {
    getMe(){
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then( res=>res.data )
    },
    login(email: string, password:string, rememberMe = false,captcha:null|string){
        return instance.post<APIResponseType<LoginResponseDataType>>(`auth/login`,{ email, password, rememberMe,captcha } )
            .then( res=>res.data )
    },
    logout(){
        return instance.delete(`auth/login`)
    }
}



type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}