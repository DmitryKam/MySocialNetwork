import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import {StoreType} from './redux/store';
import {StoreReduxType} from './redux/redux-store';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import LoginContainer from './components/Login/Login';




const App: React.FC/*<AppPropsType>*/ = () => {
    /*const store = props.store.getState();*/
    return (
        <div className={'app-wrapper'}>
            <HeaderContainer/>
            <Navbar
                /*friends={store.dialogPage.dialogs}*/
            />
            <div className={'app-wrapper-content'}>
                <Route path={'/profile/:userId?'} render={() => <ProfileContainer
                    /*store={props.store}*/
                />}/>
                <Route path={'/messages'} render={() => <DialogsContainer
                    /*store={props.store}*/
                />}/>
                <Route path={'/users'} render={() => <UsersContainer/>}/>
                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
                <Route path={'/login'} render={()=> <Login/>}/>
            </div>
        </div>
    )
}

export default App;
