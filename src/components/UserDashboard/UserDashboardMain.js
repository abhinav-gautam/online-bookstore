/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { setUser } from '../../redux/userSlice';
import CartPage from '../CartPage/CartPage';
import { decrypt } from '../Helpers/encryption';
import { unAuthReqFallback } from '../Helpers/unAuthReqFallback';
import ProfilePage from './Profile/ProfilePage';
import UserDashboardSidebar from './UserDashboardSidebar';
import WishlistPage from './Wishlist/WishlistPage';

const UserDashboardMain = () => {
    const { user, } = useSelector(state => state.user)
    const [show, setShow] = useState(false);
    const { path, url } = useRouteMatch()
    const dispatch = useDispatch()
    const history = useHistory()

    // For handling refresh and unauth access
    useEffect(() => {
        let storedUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        try {
            storedUser = decrypt(storedUser)
        } catch (err) {
            unAuthReqFallback(dispatch, history)
        }
        if (storedUser && storedUser.role === "user" && token) {
            if (!Object.keys(user).length) {
                dispatch(setUser(storedUser))
            }
        } else if (user.role !== "user") {
            unAuthReqFallback(dispatch, history)
        }
    }, [user]);


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-12">
                    <UserDashboardSidebar url={url} />
                </div>
                <div className="col-lg-10 col-md-12">
                    {/* Main Content */}
                    <div className="border-start ud-mainContent">
                        <Switch>
                            {/* Cart Page */}
                            <Route exact path={`${path}/cart`}>
                                <CartPage />
                            </Route>
                            {/* Profile Page */}
                            <Route exact path={`${path}/profile`}>
                                <ProfilePage show={show} setShow={setShow} />
                            </Route>
                            {/* Wishlist Page */}
                            <Route exact path={`${path}/wishlist`}>
                                <WishlistPage />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboardMain;
