import Preloader from '../common/Preloader/Preloader';
import React, {Suspense} from 'react';


export const withSuspend = (Component: any) => {


    return (props: any) => {
        return <Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </Suspense>
    }

}
