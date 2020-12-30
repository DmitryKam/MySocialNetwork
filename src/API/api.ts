import axios from 'axios';
import {ProfileType} from '../redux/profile-reducer';;



const instance = axios.create({
    withCredentials: true,
    baseURL:"https://social-network.samuraijs.com/api/1.0/",
    headers:{
        'API-KEY':'7cf28f0f-b2dc-4778-845d-a74e6bc104bc'
    }
});


export const usersAPI = {
    getUsers(currentPage:number=1,pageSize:number=10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response=>response.data);
    },
    deleteFollow(id:number) {
        return instance.delete(`follow/${id}`)
            .then(response=>response.data)
    },
    postFollow(id:number) {
        return instance.post(`follow/${id}`)
            .then(response=>response.data)
    },
    getProfile(userId:string) {
        console.warn('obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userId)
    },

}

export const profileAPI = {
    getProfile(userId:string) {
        return instance.get(`profile/${userId}`)
            .then(response=>response.data)
    },
    getStatus(userId:string){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status:string){
        return instance.put(`profile/status/`,{status:status })
    },
    savePhoto(file:File){
        const formData = new FormData();
        formData.append("image",file)
        return instance.put<savePhotoResponseType>(`/profile/photo`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    },
    saveProfile(profile:any){
        return instance.put<saveProfileResponseType>(`profile`, profile)
    }
}



export const autchAPI = {
    getMe(){
        return instance.get<MeResponseType>(`auth/me`).then(res=>res.data)
    },
    login(email: string, password:string, rememberMe = false,captcha:null|string){
        debugger;
        return instance.post<LoginResponseType>(`auth/login`,{email, password, rememberMe,captcha}).then(res=>res.data)
    },
    logout(){
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCapchaUrl (){
        return instance.get<SecurityResponceType>('security/get-captcha-url').then(res=>res.data)
    }
}




type MeResponseType = {
    data: { id: number, email:string, login:string }
    resultCode: number
    messages: string[]
}


type LoginResponseType = {
    data:{
        userId: number
    }
    resultCode: number
    messages: string[]
}

type savePhotoResponseType = {
    data:{
        small: string |null
        large: string| null
    }
    resultCode: number
    messages: string[]
}

type saveProfileResponseType = {
    data:ProfileType
    resultCode: number
    messages: string[]
}

type SecurityResponceType = {
    url:string
}
