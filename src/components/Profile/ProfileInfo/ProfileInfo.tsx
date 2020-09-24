import React from 'react';
import s from './ProfileInfo.module.css'

function ProfileInfo() {

    return (<div>
            <div>
                <img
                    src={'https://image.shutterstock.com/image-photo/niagara-waterfall-big-water-fall-260nw-1219662829.jpg'}/>
            </div>
            <div className={s.descriptionblock}>
                ava + discrip
            </div>

        </div>
    )
}

export default ProfileInfo;