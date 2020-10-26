import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {ProfileType, setUsersProfile} from '../../redux/profile-reducer';
import {RootState} from '../../redux/redux-store';
import {withRouter, RouteComponentProps} from 'react-router-dom'

type PathParamsType = {
    userId:string
}

type StateType = {

}

type MapStatePropsType = {
    profile: ProfileType
}
type MapDispatchPropsType = {
    setUsersProfile:(profile:ProfileType)=>void
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType



class ProfileContainer extends React.Component<PropsType,StateType> {

    componentDidMount():void {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId='2';
        }
        debugger;
        axios.get(`https://social-network.samuraijs.com/api/1.0//profile/${userId}`)
            .then(response => {
                this.props.setUsersProfile(response.data);
            })
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}/>
        );
    }
}


let mapStateToProps = (state:RootState):MapStatePropsType=> ({
    profile: state.profilePage.profile

})



let WidthUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect(mapStateToProps, {setUsersProfile}) (WidthUrlDataContainerComponent);