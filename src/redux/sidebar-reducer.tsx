import {ActionsTypes} from './redux-store';


export type SidebarType = {}

let initialState:SidebarType = {

}


const sidebarReducer = (state=initialState, action:ActionsTypes) =>{
    return state
}
export default sidebarReducer;