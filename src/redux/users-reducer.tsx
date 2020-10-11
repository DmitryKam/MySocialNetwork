import {ActionsTypes} from './store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SETUSERS = 'SET_USERS';



type LocationType = {
    city: string
    country: string
}

export type UsersType = {
    id: number
    photoUrl:string,
    followed:boolean
    fullName: string
    status: string
    location:LocationType
}
export type UsersPageType = {
    users: Array<UsersType>
}
let initialState:UsersPageType = {
    users: [
/*        {id: 1, photoUrl:'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png', followed: false, fullName: 'Dmitry', status: 'I Am a boss', location:{city:'Minsk', country:'Belarus'}},
        {id: 2, photoUrl:'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png', followed: true, fullName: 'Sasha', status: 'I Am a boss too', location:{city:'Minsk', country:'Belarus'}},
        {id: 3, photoUrl:'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png', followed: false, fullName: 'Andrew', status: 'I Am a boss too', location:{city:'Minsk', country:'Belarus'}},
    */
    ],

}

const usersReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map((u)=> {
                    if (u.id===action.userId){
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map((u)=> {
                    if (u.id===action.userId){
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: [...state.users, ...action.users]
            }

        default:
            return state;
    }

}

export const followAC = (userId:number) => {
    return {
        type: FOLLOW,
        userId:userId
    } as const
}
export const unFollowAC = (userId:number) => {
    return {
        type: UNFOLLOW,
        userId:userId
    } as const
}
export const setUsersAC = (users: UsersType[]) => {
    return {
        type: SETUSERS,
        users: users

    } as const
}



export default usersReducer;