import {ActionsTypes} from './store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SETUSERS = 'SET_USERS';
const SETCURRENTPAGE = 'SET_CURRENT_PAGE'
const TOTALUSERSCOUNT = 'TOTALUSERSCOUNT'


type LocationType = {
    city: string
    country: string
}

type PhotosType = {
    small: string
    large: string

}
export type UsersType = {
    id: number
    photos: PhotosType,
    followed: boolean
    name: string
    status: string
    location: LocationType
}
export type UsersPageType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
}
let initialState: UsersPageType = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 2,
}

const usersReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case 'TOTALUSERSCOUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            }

        default:
            return state;
    }

}

export const followAC = (userId: number) => {
    return {
        type: FOLLOW,
        userId: userId
    } as const
}
export const unFollowAC = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId: userId
    } as const
}
export const setUsersAC = (users: UsersType[]) => {
    return {
        type: SETUSERS,
        users: users

    } as const
}

export const setCurrentPageAC = (currentPage:number) => {
    return {
        type: SETCURRENTPAGE,
        currentPage: currentPage

    } as const
}

export const setTotalUsersCountAC = (totalUsersCount:number) => {
    return {
        type: TOTALUSERSCOUNT,
        totalUsersCount

    } as const
}

export default usersReducer;