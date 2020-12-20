import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initializedAppTC} from './redux/app-reducer';
import store, {RootState, StoreReduxType} from './redux/redux-store';
import Preloader from './common/Preloader/Preloader';


type StateType = {}

type OwnPropsType = {}

type mapStatePropsType = {
    initialized: boolean
}

type mapDispatchPropsType = {
    initializedAppTC:()=>void
}

export type AppPropsType = OwnPropsType & mapStatePropsType & mapDispatchPropsType
class App extends React.Component<AppPropsType,StateType> {

 componentDidMount(): void {
     this.props.initializedAppTC()
 }

    render() {
       if(!this.props.initialized){
           return <Preloader />
       }
        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar
                />
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer
                    />}/>
                    <Route path={'/messages'} render={() => <DialogsContainer
                    />}/>
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

const mapStatePropsType = (state:RootState):mapStatePropsType => ({
    initialized: state.app.initialized
})

let AppContainer =  compose<any>(
    withRouter,
    connect(mapStatePropsType, {initializedAppTC})
)(App)

 const SamuraiJSApp = ()=>{
    return  <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}

export default SamuraiJSApp;

