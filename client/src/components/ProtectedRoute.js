import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isAuth, componentToRender }) => {
    if (isAuth === true) {
        return (
            <div>
                <Route>



                </Route>
            </div>
        )
    } else {
        return (
            <div className="redirect"></div>
        )
    }

}

export default ProtectedRoute
