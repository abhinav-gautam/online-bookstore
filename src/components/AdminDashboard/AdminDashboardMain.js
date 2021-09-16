import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import ProfilePage from '../UserDashboard/Profile/ProfilePage';
import AdminDashboardSidebar from './AdminDashboardSidebar';
import AddBooks from './Books/AddBooks';
import EditBook from './Books/EditBook';
import ViewBooks from './Books/ViewBooks';
import CategoriesPage from './Categories/CategoriesPage';

const AdminDashboardMain = () => {
    const { path, url } = useRouteMatch()
    const [show, setShow] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);

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
                                {/* View Books */}
                                <Route exact path={`${path}/viewBooks`}>
                                    <ViewBooks setShow={setShow} setUpdateIndex={setUpdateIndex} />
                                </Route>
                                {/* Add Books */}
                                <Route exact path={`${path}/addBook`}>
                                    <AddBooks />
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
                    {/* Edit Book Modal */}
                    <EditBook
                        show={show} setShow={setShow}
                        updateIndex={updateIndex} setUpdateIndex={setUpdateIndex}
                    />
                </div>
            </div>
        </Router>
    );
}

export default AdminDashboardMain;
