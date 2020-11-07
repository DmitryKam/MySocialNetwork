import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getProfileProfileThunkCreator, ProfileType, setUsersProfile} from '../../redux/profile-reducer';
import {RootState} from '../../redux/redux-store';
import {withRouter, RouteComponentProps, Redirect} from 'react-router-dom'

type PathParamsType = {
    userId:string
}

type StateType = {

}

type MapStatePropsType = {
    profile: ProfileType
    isAuth: boolean
}
type MapDispatchPropsType = {
    getProfileProfileThunkCreator:(userId:string)=>void
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType



class ProfileContainer extends React.Component<PropsType,StateType> {

    componentDidMount():void {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId=`2`;
        }
        this.props.getProfileProfileThunkCreator(userId);
        // if(!userId){
        //     userId='2';
        // }
        // usersAPI.getProfileId(userId)
        //     .then(data => {
        //         this.props.setUsersProfile(data);
        //     })
    }


    render() {
        if(!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }

        return (
            <Profile {...this.props}/>
        );
    }
}


let mapStateToProps = (state:RootState):MapStatePropsType=> ({
    profile: state.profilePage.profile,
    isAuth:state.auth.data.isAuth

})



let WidthUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect(mapStateToProps, {
   getProfileProfileThunkCreator,
}) (WidthUrlDataContainerComponent);