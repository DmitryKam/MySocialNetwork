import React, {Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, HashRouter, Route, withRouter} from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';


import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initializedAppTC} from './redux/app-reducer';
import store, {RootState, StoreReduxType} from './redux/redux-store';
import Preloader from './common/Preloader/Preloader';

//import ProfileContainer from './components/Profile/ProfileContainer';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {withSuspend} from './hoc/withSuspend';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
//const HeaderContainer = React.lazy(() => import('./components/Header/HeaderContainer'));


type StateType = {}

type OwnPropsType = {}

type mapStatePropsType = {
    initialized: boolean
}

type mapDispatchPropsType = {
    initializedAppTC: () => void
}

export type AppPropsType = OwnPropsType & mapStatePropsType & mapDispatchPropsType

class App extends React.Component<AppPropsType, StateType> {

    componentDidMount(): void {
        this.props.initializedAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar
                />
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile/:userId?'} render={withSuspend(ProfileContainer)}/>
                    <Route path={'/messages'} render={withSuspend(DialogsContainer)}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}

const mapStatePropsType = (state: RootState): mapStatePropsType => ({
    initialized: state.app.initialized
})

let AppContainer = compose<any>(
    withRouter,
    connect(mapStatePropsType, {initializedAppTC})
)(App)

const SamuraiJSApp = () => {
    return <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    </React.StrictMode>
}

export default SamuraiJSApp;

