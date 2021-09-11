/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import defaultProfilePic from "../../media/defaultProfilePic.png"
import { useSelector } from 'react-redux';
import ProfileSidebar from './ProfileSidebar';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';
import { updateUser } from '../../redux/userReducers';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import { setCartUsername } from '../../redux/cartSlice';

const ProfilePage = () => {
    const { user, userErrors, isUserLoading } = useSelector(state => state.user)
    const { cartUsername } = useSelector(state => state.cart)

    const [file, setFile] = useState(null);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (user.username !== cartUsername) {
            dispatch(setCartUsername(user.username))
        }
    }, [user.username]);

    const updateFormSubmit = userEdited => {
        // Creating formData object
        const formData = new FormData()

        // Appending image to it
        if (file) {
            formData.append("profilePicture", file, file.name)
        }

        // Appending productObj
        userEdited._id = user._id
        userEdited.cartUsername = cartUsername
        userEdited = CryptoJS.AES.encrypt(JSON.stringify(userEdited), process.env.REACT_APP_SECRET_CRYPTO).toString()

        formData.append("user", userEdited)

        dispatch(updateUser(formData))
    }
    const onFileSelect = (event) => {
        setFile(event.target.files[0])
    }
    return (
        <>
            <div className="container-fluid top-margin-150 ">
                <div className="row mt-5">
                    <div className="col-12 col-md-8 ps-5 border-end">
                        <p className="h3">Welcome {user.username.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}</p>
                        <p className="h4 mt-4">Edit your profile</p>
                        <div className="text-center mt-4">
                            {
                                file
                                    ? <img src={URL.createObjectURL(file)} className="border border-dark rounded-circle" width="200px" alt="" />
                                    : user.profilePicture
                                        ?
                                        <img src={user.profilePicture} className="border border-dark rounded-circle" width="200px" alt="" />
                                        :
                                        <img src={defaultProfilePic} className="border border-dark rounded-circle" width="200px" alt="" />
                            }
                        </div>
                        <div className="">
                            <form className="mt-4 " onSubmit={handleSubmit(updateFormSubmit)}>
                                <div className="row justify-content-center">
                                    {/* Profile Picture */}
                                    <div className="text-center mb-3">
                                        <label htmlFor="profilePicture" id="profilePictureLabel" className="text-danger cursor-pointer fw-bold">Change Profile Picture</label>
                                        <input
                                            type="file" className="d-none"
                                            accept="image/*" name="profilePicture"
                                            id="profilePicture" onChange={onFileSelect} />
                                    </div>
                                    {/* Name */}
                                    <div className="col-5">
                                        <div class="form-floating mb-3">
                                            <input
                                                type="text" class="form-control"
                                                id="floatingInput" placeholder="#" name="name"
                                                {...register("name", { required: true })} />
                                            <label for="floatingInput">Name</label>
                                        </div>
                                    </div>
                                    {/* Username */}
                                    <div className="col-5">
                                        <div class="form-floating mb-3">
                                            <input
                                                type="text" class="form-control"
                                                id="floatingInput" placeholder="#" name="username"
                                                {...register("username", { required: true })} />
                                            <label for="floatingInput">Username</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    {/* Email */}
                                    <div className="col-5">
                                        <div class="form-floating mb-3">
                                            <input
                                                type="email" class="form-control"
                                                id="floatingInput" placeholder="#" name="email"
                                                {...register("email", { required: true })} />
                                            <label for="floatingInput">Email</label>
                                        </div>
                                    </div>
                                    {/* Phone number */}
                                    <div className="col-5">
                                        <div class="form-floating mb-3">
                                            <input
                                                type="number" class="form-control"
                                                id="floatingInput" placeholder="#" name="phone"
                                                {...register("phone")} />
                                            <label for="floatingInput">Phone Number</label>
                                        </div>
                                    </div>

                                </div>
                                {userErrors && <p className="alert alert-danger w-25 text-center mx-auto py-2 mt-2">{userErrors}</p>}
                                <div className="text-center mt-4 mb-5">
                                    {
                                        isUserLoading && <LoadingSpinner message=" Saving Changes..." />
                                    }
                                    <button className="btn btn-danger mt-3" type="submit">Save</button>
                                    <button className="btn btn-secondary mt-3 ms-4">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <ProfileSidebar />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
