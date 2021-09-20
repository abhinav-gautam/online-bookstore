/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { setError } from '../../redux/errorSlice';
import { setUser } from '../../redux/userSlice';
import { decrypt } from '../Helpers/encryption';
import Message from '../Helpers/Message';
import resetAllState from '../Helpers/resetAllState';
import { unAuthReqFallback } from '../Helpers/unAuthReqFallback';
import ProfilePage from '../UserDashboard/Profile/ProfilePage';
import AdminDashboardSidebar from './AdminDashboardSidebar';
import AddBooks from './Books/AddBooks';
import EditBook from './Books/EditBook';
import ViewBooks from './Books/ViewBooks';
import CategoriesPage from './Categories/CategoriesPage';
import UsersPage from './Users/UsersPage';

const AdminDashboardMain = () => {
    const { path, url } = useRouteMatch()
    const [show, setShow] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);
    const { user, userErrors } = useSelector(state => state.user)
    const { booksError } = useSelector(state => state.books)
    const { categoryError } = useSelector(state => state.category)
    const { error } = useSelector(state => state.error)
    const dispatch = useDispatch()
    const history = useHistory()

    // For session expired and token not available errors
    useEffect(() => {
        if (["jwt expired", "token not available"].indexOf(userErrors || booksError || categoryError) >= 0) {
            resetAllState(dispatch)
            dispatch(setError("Session expired. Please login again."))
            history.push("/")
        }
    }, [userErrors, booksError, categoryError]);

    // For user session and unauth access
    useEffect(() => {
        let storedUser = localStorage.getItem("user")
        try {
            storedUser = decrypt(storedUser)
        } catch (err) {
            unAuthReqFallback(dispatch, history)
        }
        const token = localStorage.getItem("token")
        if (storedUser && storedUser.role === "admin" && token) {
            if (!Object.keys(user).length) {
                dispatch(setUser(storedUser))
            }
        } else if (user.role !== "admin") {
            unAuthReqFallback(dispatch, history)
        }
    }, [user]);

    return (
        <div className="container-fluid">
            {
                error && <Message message={error} variant="danger" />
            }
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
                            {/* Profile Module */}
                            <Route exact path={`${path}/profile`}>
                                <ProfilePage show={false} setShow={setShow} />
                            </Route>
                            {/* Category Module*/}
                            <Route exact path={`${path}/category`}>
                                <CategoriesPage />
                            </Route>
                            {/* User Module*/}
                            <Route exact path={`${path}/users`}>
                                <UsersPage />
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
    );
}

export default AdminDashboardMain;
