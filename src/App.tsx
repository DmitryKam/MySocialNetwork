import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import state, { StoreType} from './redux/state';



export type AppPropsType = {
    store: StoreType
}

const App:React.FC<AppPropsType> = (props) =>{
    const state = props.store.getState();
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar friends={state.dialogPage.dialogs}/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile'} render={() =><Profile
                        posts = {state.profilePage.posts}
                        newPostText={state.profilePage.newPostText}
                        dispatch = {props.store.dispatch.bind(props.store)}
                    />}/>
                    <Route path={'/messages'} render={() =><Dialogs
                        dialogs={state.dialogPage.dialogs}
                        messages = {state.dialogPage.messages} />}/>
                    <Route path={'/news'} render={() =><News />}  />
                    <Route path={'/music'} render={() =><Music />} />
                    <Route path={'/settings'} render ={() =><Settings />}/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
