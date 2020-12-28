import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {
    getProfileProfileThunkCreator,
    getStatus,
    ProfileType, savePhoto, saveProfile,
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
    status: string | null
    authorizedUserId: number | null
}
type MapDispatchPropsType = {
    getProfileProfileThunkCreator: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string | null) => void
    savePhoto: (savePhoto: any) => void
    saveProfile:(prifile:ProfileType)=>void

}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

export type ProfilesPropsType = RouteComponentProps<PathParamsType> & OwnPropsType


class ProfileContainer extends React.Component<ProfilesPropsType, StateType> {


    refreshProfile() {
        let userId = this.props.match.params.userId;
        //let status = this.props.status
        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfileProfileThunkCreator(userId);
        this.props.getStatus(userId)
        //this.props.updateStatus(status)

    }


    componentDidMount(): void {
        this.refreshProfile()
    }


    componentDidUpdate(prevProps: Readonly<ProfilesPropsType>, prevState: Readonly<StateType>, snapshot?: any): void {


        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }

        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
        if (prevProps.profile.photos !== this.props.profile.photos) {
            this.refreshProfile()
        }
    }

    render() {


        return (
            <Profile {...this.props}
            />
        );
    }
}

let mapStateToProps = (state: RootState): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.data.isAuth,
    status: state.profilePage.status,
    authorizedUserId: state.auth.data.id

})


export default compose<any>(
    connect(mapStateToProps, {
        getProfileProfileThunkCreator, getStatus, updateStatus, savePhoto,saveProfile
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)