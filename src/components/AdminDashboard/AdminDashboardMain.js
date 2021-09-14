import React from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import ProfilePage from '../UserDashboard/Profile/ProfilePage';
import AdminDashboardSidebar from './AdminDashboardSidebar';
import CategoriesPage from './Categories/CategoriesPage';

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
                                {/* Add Book Page  */}
                                <Route exact path={`${path}/addBook`}>
                                    Add Books
                                </Route>
                                {/* View Books Page */}
                                <Route exact path={`${path}/viewBooks`}>
                                    View Books
                                </Route>
                                {/* Category Module */}
                                <Route exact path={`${path}/profile`}>
                                    <ProfilePage />
                                </Route>
                                {/* User Module*/}
                                <Route exact path={`${path}/category`}>
                                    <CategoriesPage />
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
