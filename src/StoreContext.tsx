import React from 'react';
import store, {StoreReduxType} from './redux/redux-store';


export type ProviderType = {
    store: StoreReduxType
    children: React.ReactNode
}

const StoreContext = React.createContext({} as StoreReduxType)

export const Provider = (props: ProviderType) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContext;