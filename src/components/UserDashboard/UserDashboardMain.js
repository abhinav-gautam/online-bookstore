import React from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import CartPage from '../CartPage/CartPage';
import UserDashboardSidebar from './UserDashboardSidebar';

const UserDashboardMain = () => {
    const { path, url } = useRouteMatch()



    return (
        <Router>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <UserDashboardSidebar url={url} />
                    </div>
                    <div className="col-10 ">
                        <div className="border-start">
                            <Switch>
                                {/* Cart Page */}
                                <Route exact path={`${path}/cart`}>
                                    <CartPage />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            {/* <Footer /> */}
        </Router>
    );
}

export default UserDashboardMain;
