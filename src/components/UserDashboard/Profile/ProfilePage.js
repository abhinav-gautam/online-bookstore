/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SavedAddresses from '../SavedAddresses/SavedAddresses';
import SavedCards from '../SavedCards/SavedCards';
import EditProfile from './EditProfile';
import ProfileSidebar from './ProfileSidebar';

const ProfilePage = () => {
    const { user } = useSelector(state => state.user)
    const [show, setShow] = useState(false);
    const { path, url } = useRouteMatch()

    return (
        <Router>
            <div className="container-fluid top-margin-150 ">
                <div className="row mt-5">
                    <div className="col-12 col-md-9 ps-5 border-end">
                        {
                            user.role === "user"
                                ?
                                <p className="h3">Welcome {user.username.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}</p>
                                :
                                <p className="h3">Welcome to Admin Dashboard, {user.username.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}</p>
                        }
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
                                <SavedCards />
                            </Route>
                        </Switch>
                    </div>
                    <div className="col-12 col-md-3">
                        <ProfileSidebar show={show} setShow={setShow} url={url} />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default ProfilePage;