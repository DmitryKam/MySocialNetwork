import {ActionsTypes, RootState} from './redux-store';
import {usersAPI} from '../API/api';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {updateObjectInArray} from '../utils/object-helpers/object-helpers';

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
    isFetching: boolean,
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




const usersReducer = (state = initialState, action: ActionsTypes): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,'id', {followed: true})
                // users: state.users.map((u) => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: true}
                //     }
                //     return u;
                // })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,'id', {followed: false})
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
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
                ,
            }
        }


        default:
            return state;
    }

}

export const followSuccess = (userId: number) => {
    return {
        type: FOLLOW,
        userId: userId
    } as const
}
export const unFollowSuccess = (userId: number) => {
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
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SETCURRENTPAGE,
        currentPage: currentPage

    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: TOTALUSERSCOUNT,
        totalUsersCount

    } as const
}
export const toggleisFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching

    } as const
}
export const toggleIsFollowingProgress = (followingInProgress: boolean, id: number) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        followingInProgress,
        id,
    } as const
}


type ThunkType = ThunkAction<void, RootState, unknown, ActionsTypes>


export const requestUsersThunkCreater = (page: number, pageSize: number): ThunkType =>

    async (dispatch: ThunkDispatch<RootState, unknown, ActionsTypes>, getState: () => RootState) => {
        dispatch(toggleisFetching(true));
        dispatch(setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleisFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }


export const followUnfollowFlow = async (dispatch: ThunkDispatch<RootState, unknown, ActionsTypes>, id: number, apiMethod: any, actionCreator: any) => {

    dispatch(toggleIsFollowingProgress(true, id));
    let data = await apiMethod(id)
    if (data.resultCode == 0) {
        dispatch(actionCreator(id));
    }
    dispatch(toggleIsFollowingProgress(false, id));
}


export const deleteFollowThunkCreater = (id: number): ThunkType =>

    async (dispatch: ThunkDispatch<RootState, unknown, ActionsTypes>, getState: () => RootState) => {
        followUnfollowFlow(dispatch, id, usersAPI.deleteFollow.bind(usersAPI), unFollowSuccess)
    }

export const toggleFollowingThunkCreater = (id: number): ThunkType => async (dispatch: ThunkDispatch<RootState, unknown, ActionsTypes>, getState: () => RootState) => {
    followUnfollowFlow(dispatch, id, usersAPI.postFollow.bind(usersAPI), followSuccess)
}

export default usersReducer;