/* eslint-disable react-hooks/exhaustive-deps */
import React, { } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateRole } from '../../../redux/userReducers';
import LoadingSpinner from '../../Helpers/LoadingSpinner';

const UsersPage = () => {
    const { allUsers, isUsersLoading } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const toggleStatus = ({ user, index }) => {
        const userEdited = { username: user.username, email: user.email }
        user.status === "active" ? userEdited.status = "blocked" : userEdited.status = "active"
        dispatch(updateRole({ user: userEdited, index }))
    }
    const toggleRole = ({ user, index }) => {
        const userEdited = { username: user.username, email: user.email }
        user.role === "user" ? userEdited.role = "admin" : userEdited.role = "user"
        dispatch(updateRole({ user: userEdited, index }))
    }

    return (
        <div className="container-fluid">
            <div className="h4 mt-5">All Users</div>
            <div className="table-responsive mt-4">
                <table className="table table-bordered table-sm">
                    <thead className="table-danger">
                        <tr className="text-center">
                            <th>S.no.</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>E-Mail</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Total Addresses</th>
                            <th>Total Cards</th>
                            <th>Created At</th>
                            <th>Last Login</th>
                            <th>Status</th>
                            <th colSpan="2">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, index) => [
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || "-"}</td>
                                    <td>{user.role}</td>
                                    <td>{user.addresses?.length || "-"}</td>
                                    <td>{user.cards?.length || "-"}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.lastLogin}</td>
                                    <td>{user.status}</td>
                                    <td className="text-center">
                                        <span className="text-danger fw-bold cursor-pointer" onClick={() => toggleStatus({ user, index })}>{user.status === "active" ? "Block" : "Unblock"}</span>
                                    </td>
                                    <td className="text-center">
                                        <span className="text-danger fw-bold cursor-pointer" onClick={() => toggleRole({ user, index })}>{user.role === "user" ? "Make Admin" : "Make User"}</span>
                                    </td>
                                </tr>
                            ])
                        }
                        {
                            isUsersLoading
                                ?
                                <tr className="text-center"><td colSpan="12"><LoadingSpinner message="Loading Users..." /></td></tr>
                                : !allUsers.length &&
                                <tr className="text-center"><td colSpan="12">No Records Found</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersPage;
