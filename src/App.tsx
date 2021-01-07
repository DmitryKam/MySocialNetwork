import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';

import {withSuspend} from './hoc/withSuspend';
import {initializedAppTC} from './redux/app-reducer';
import store, {AppStateType} from './redux/redux-store';

import Login from './components/Login/Login';
import HeaderContainer from './components/Header/HeaderContainer';
import Preloader from './common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


type mapStatePropsType = {
    initialized: boolean
}

type mapDispatchPropsType = {
    initializedAppTC: () => void
}

export type AppPropsType = {} & mapStatePropsType & mapDispatchPropsType


const App = React.memo(function (props: AppPropsType) {
    console.log('APP RENDERER')
    useEffect(() => {
        props.initializedAppTC()
    }, [props.initialized,props])


    if (!props.initialized) {
        return <Preloader/>
    }
    return (
        <div className={'app-wrapper'}>

            <HeaderContainer/>
            <div className={'app-menu'}>
                <Navbar/>

                <div className={'app-wrapper-content'}>

                    <Switch>
                        <Route exact path={'/'}
                               render={() => <Redirect to={'/profile'}/>}/>

                        <Route path={'/profile/:userId?'}
                               render={withSuspend(ProfileContainer)}/>

                        <Route path={'/messages'}
                               render={withSuspend(DialogsContainer)}/>

                        <Route path={'/users'}
                               render={() => <UsersContainer/>}/>

                        <Route path={'/news'}
                               render={() => <News/>}/>

                        <Route path={'/music'}
                               render={() => <Music/>}/>

                        <Route path={'/settings'}
                               render={() => <Settings/>}/>

                        <Route path={'/login'}
                               render={() => <Login/>}/>
                    </Switch>

                </div>
            </div>
        </div>
    )
})


const mapStatePropsType = (state: AppStateType): mapStatePropsType => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStatePropsType, {initializedAppTC})
)(App)

const SamuraiJSApp = () => {
    return <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}

export default SamuraiJSApp;

