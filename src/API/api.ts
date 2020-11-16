import axios from 'axios';



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
        return instance.put(`profile/status/`,{ status:status })
    }

}

export const autchAPI = {
    getMe(){
        return instance.get(`auth/me`)
            .then(response=>response.data)
    },
}



