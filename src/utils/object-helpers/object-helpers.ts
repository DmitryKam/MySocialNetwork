import { UserType } from '../../redux/users-reducer';



export const updateObjectInArray = (items:Array<UserType>, itemsId:number, objPropName:any, newObjProps:any) =>{
    return items.map( (u:any) => {
        if (u[objPropName] === itemsId) {
            return { ...u, ...newObjProps }
        }
        return u;
    })
}