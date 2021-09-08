import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, Redirect, Link } from 'react-router-dom';
import CartPage from '../CartPage/CartPage';

const UserDashboardMain = () => {
    const { path, url } = useRouteMatch()

    // useEffect(() => {
    //     if (path==="/userdashboard/:username/cart") {
    //         history.push
    //     }
    // }, [path]);

    return (
        <Router>
            <div>
                <Link to={`${url}/cart`}>Cart</Link>
            </div>
            <Switch>
                {/* Cart Page */}
                <Route exact path={`${path}/cart`}>
                    <CartPage />
                </Route>
            </Switch>

        </Router>
    );
}

export default UserDashboardMain;
