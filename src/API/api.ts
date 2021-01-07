import axios from 'axios';
import {UserType} from '../redux/users-reducer';


export const instance = axios.create({
    withCredentials: true,
    baseURL:"https://social-network.samuraijs.com/api/1.0/",
    headers:{
        'API-KEY':'7cf28f0f-b2dc-4778-845d-a74e6bc104bc'
    }
});



export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}


export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D={}> = {
    data: D
    messages: Array<string>
    resultCode: ResultCodesEnum
}





