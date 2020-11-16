import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'


type ProfileStatusPropsType = {
    status: string
    getStatus: (userId: string) => void
    updateStatus:(status: string) => void
}


class ProfileStatus extends React.Component<ProfileStatusPropsType> {


    state = {
        editMode: false,
        status: this.props.status,
        title: 'Yo'
    }

    activateEditMode = () => {
        debugger;
        console.log("this",this);
        this.setState(
            {
                editMode: true
            })
    }


    deactivateEditMode = () => {
        this.setState(
            {
                editMode: false
            })
    this.props.updateStatus(this.state.status)
    }

    onStatusChange =(e:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            status: e.currentTarget.value
        })
    }

    render(): React.ReactNode {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={ this.activateEditMode }>{this.props.status ||" ---- " }</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input
                        onChange={this.onStatusChange}
                        autoFocus={true}
                        onBlur={this.deactivateEditMode }
                        value={this.state.status}/>
                </div>
                }
            </div>
        )
    }


}

export default ProfileStatus;