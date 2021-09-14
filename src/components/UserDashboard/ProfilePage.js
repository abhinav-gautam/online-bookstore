/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditProfile from './EditProfile';
import ProfileSidebar from './ProfileSidebar';
import SavedAddresses from './SavedAddresses';

const ProfilePage = () => {
    const { user } = useSelector(state => state.user)
    const [show, setShow] = useState(false);
    const { path, url } = useRouteMatch()

    return (
        <Router>
            <div className="container-fluid top-margin-150 ">
                <div className="row mt-5">
                    <div className="col-12 col-md-8 ps-5 border-end">
                        <p className="h3">Welcome {user.username.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}</p>
                        <Switch>
                            {/* Edit Profile */}
                            <Route exact path={path}>
                                <EditProfile show={show} />
                            </Route>
                            {/* Saved Addressess */}
                            <Route exact path={`${path}/addresses`}>
                                <SavedAddresses />
                            </Route>
                            {/* Saved Credit Cards */}
                            <Route exact path={`${path}/cards`}>
                                Saved Cards
                            </Route>
                        </Switch>
                    </div>
                    <div className="col-12 col-md-4">
                        <ProfileSidebar show={show} setShow={setShow} url={url} />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default ProfilePage;
