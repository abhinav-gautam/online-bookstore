import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import bcrypt from 'bcryptjs';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userReducers';
import LoadingSpinner from '../Helpers/LoadingSpinner';

const ChangePasswordModal = ({ show, setShow }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const { user, userErrors, isUserLoading } = useSelector(state => state.user)
    const [passwordErrors, setPasswordErrors] = useState("");

    const updatePassword = ({ oldPassword, newPassword, confirmPassword }) => {
        setPasswordErrors("")
        if (newPassword === confirmPassword) {
            // Creating new form data
            const formData = new FormData()
            // Hashing the new password
            newPassword = bcrypt.hashSync(newPassword, 7)
            // Creating a new user object
            let newUser = { oldPassword, newPassword, username: user.username }
            // Encrypting the user obj
            newUser = CryptoJS.AES.encrypt(JSON.stringify(newUser), process.env.REACT_APP_SECRET_CRYPTO).toString()
            // Adding encrypted new user to the form data
            formData.append("user", newUser)
            // Dispatching update user action
            dispatch(updateUser(formData))
        } else {
            setPasswordErrors("Passwords did not match.")
        }
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(updatePassword)}>
                    {/* Old Password */}
                    <div className="form-floating mt-4">
                        <input
                            type="password" className="form-control"
                            name="oldPassword" id="oldPassword" placeholder="#"
                            {...register("oldPassword", { required: true })}
                        />
                        <label htmlFor="oldPassword">Old Password</label>
                        {errors.oldPassword?.type === "required" && <p className="alert alert-danger py-2 mt-2">Old Password is required</p>}
                    </div>
                    {/* New Password */}
                    <div className="form-floating mt-4">
                        <input
                            type="password" className="form-control"
                            name="newPassword" id="newPassword" placeholder="#"
                            {...register("newPassword", { required: true })}
                        />
                        <label htmlFor="newPassword">New Password</label>
                        {errors.newPassword?.type === "required" && <p className="alert alert-danger py-2 mt-2">New Password is required</p>}
                    </div>
                    {/* Confirm Password */}
                    <div className="form-floating mt-4">
                        <input
                            type="password" className="form-control"
                            name="confirmPassword" id="confirmPassword" placeholder="#"
                            {...register("confirmPassword", { required: true })}
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        {errors.confirmPassword?.type === "required" && <p className="alert alert-danger py-2 mt-2"> Confirm Password is required</p>}
                    </div>
                    {userErrors && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">{userErrors}</p>}
                    {passwordErrors && <p className="alert alert-danger py-2 mt-2">{passwordErrors}</p>}
                    <div className="text-center mt-4">
                        {isUserLoading && <LoadingSpinner message=" Saving Changes..." />}
                        <button type="submit" className="btn btn-danger mt-4">Update</button>
                        <button className="btn btn-secondary ms-4 mt-4" onClick={() => setShow(false)}>Cancel</button>
                    </div>
                </form>
            </Modal.Body>

        </Modal>
    );
}

export default ChangePasswordModal;
