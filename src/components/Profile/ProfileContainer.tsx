import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {
    getProfileProfileThunkCreator,
    getStatus,
    ProfileType,
    setUsersProfile,
    updateStatus
} from '../../redux/profile-reducer';
import {RootState} from '../../redux/redux-store';
import {withRouter, RouteComponentProps, Redirect} from 'react-router-dom'
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

type PathParamsType = {
    userId: string

}

type StateType = {}

type MapStatePropsType = {
    profile: ProfileType
    isAuth: boolean
    status: string
}
type MapDispatchPropsType = {
    getProfileProfileThunkCreator: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus:(status: string) => void

}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

export type ProfilesPropsType = RouteComponentProps<PathParamsType> & OwnPropsType


class ProfileContainer extends React.Component<ProfilesPropsType, StateType> {

    componentDidMount(): void {
        let userId = this.props.match.params.userId;
        let status = this.props.status
        if (!userId) {
            userId = `11906`;
        }
        this.props.getProfileProfileThunkCreator(userId);
        this.props.getStatus(userId)
        this.props.updateStatus(status)

    }


    render() {


        return (
            <Profile {...this.props} />
        );
    }
}

let mapStateToProps = (state: RootState): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.data.isAuth,
    status: state.profilePage.status,

})


export default compose<any>(
    connect(mapStateToProps, {
        getProfileProfileThunkCreator, getStatus, updateStatus,
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)