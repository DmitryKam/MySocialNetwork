import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/redux-store';


type ProfileStatusPropsType = {
    status: string
    getStatus: (userId: string) => void
    updateStatus:(status: string) => void
}


const ProfileStatusWithHooks =(props:ProfileStatusPropsType) => {


//const status = useSelector<RootState>(state =>state.profilePage.status)
const [editMode, setEditMode] = useState<boolean>(false)
const [status, setStatus] = useState<string>(props.status)

    const activateEditMode = ()=>{
        setEditMode(true)
    }

    const deactivateEditMode = ()=>{
    setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setStatus(e.currentTarget.value)
    }

        return (
            <div>
                {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode }>{props.status ||" ---- " }</span>
                </div>
                }
                {editMode &&
                <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode }
                        value={status}/>
                </div>
                }
            </div>
        )
}

export default ProfileStatusWithHooks;