import {APIResponseType, instance} from './api';
import {profileAPI} from './profile-api';



export const usersAPI = {
    getUsers(currentPage:number=1,pageSize:number=10){
        return instance.get(`users?page=${ currentPage }&count=${ pageSize }`)
            .then( response => response.data );
    },
    deleteFollow(id:number) {
        return instance.delete(`follow/${ id }`)
            .then( response => response.data ) as Promise<APIResponseType>
    },
    postFollow(id:number) {
        return instance.post<APIResponseType>(`follow/${ id }`)
            .then( response => response.data )
    },
    getProfile(userId:string) {
        console.warn('obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userId)
    },
}


