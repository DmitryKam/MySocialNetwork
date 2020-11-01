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
    }

}



