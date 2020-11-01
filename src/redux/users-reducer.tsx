import {ActionsTypes} from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SETUSERS = 'SET_USERS';
const SETCURRENTPAGE = 'SET_CURRENT_PAGE'
const TOTALUSERSCOUNT = 'TOTALUSERSCOUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


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
    isFetching:boolean,
    followingInProgress: number[]

}
let initialState: UsersPageType = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action: ActionsTypes):UsersPageType => {
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
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':{
            return {
                ...state,
                followingInProgress: action.followingInProgress
                ?[...state.followingInProgress, action.id]
                    :state.followingInProgress.filter(id=>id !== action.id)
                ,
            }
        }


        default:
            return state;
    }

}

export const follow = (userId: number) => {
    return {
        type: FOLLOW,
        userId: userId
    } as const
}
export const unFollow = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId: userId
    } as const
}
export const setUsers = (users: UsersType[]) => {
    return {
        type: SETUSERS,
        users: users

    } as const
}

export const setCurrentPage = (currentPage:number) => {
    return {
        type: SETCURRENTPAGE,
        currentPage: currentPage

    } as const
}

export const setTotalUsersCount = (totalUsersCount:number) => {
    return {
        type: TOTALUSERSCOUNT,
        totalUsersCount

    } as const
}
export const toggleisFetching = (isFetching:boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching

    } as const
}

export const toggleIsFollowingProgress = (followingInProgress:boolean, id: number)=>{
    return {
        type:TOGGLE_IS_FOLLOWING_PROGRESS,
        followingInProgress,
        id,
    } as const
}


export default usersReducer;