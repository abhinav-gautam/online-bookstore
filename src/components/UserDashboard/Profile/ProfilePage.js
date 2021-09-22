/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { toTitleCase } from '../../Helpers/toTitleCase';
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
                    <div className="col-12 col-md-9 ps-5 border-end pp-main">
                        {
                            user.username && (
                                user.role === "user"
                                    ?
                                    <p className="h3">Welcome {toTitleCase(user.username)}</p>
                                    :
                                    <p className="h3">Welcome to Admin Dashboard, {toTitleCase(user.username)}</p>
                            )
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
                    <div className="col-12 col-md-3 pp-sidebar">
                        <ProfileSidebar show={show} setShow={setShow} url={url} />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default ProfilePage;