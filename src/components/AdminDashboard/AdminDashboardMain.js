import React from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import ProfilePage from '../UserDashboard/ProfilePage';
import AdminDashboardSidebar from './AdminDashboardSidebar';

const AdminDashboardMain = () => {
    const { path, url } = useRouteMatch()
    return (
        <Router>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <AdminDashboardSidebar url={url} />
                    </div>
                    <div className="col-10 ">
                        <div className="border-start">
                            <Switch>
                                {/* Books Module */}
                                <Route exact path={`${path}/cart`}>
                                </Route>
                                {/* Category Module */}
                                <Route exact path={`${path}/profile`}>
                                    <ProfilePage />
                                </Route>
                                {/* User Module*/}
                                <Route exact path={`${path}/wishlist`}>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default AdminDashboardMain;
