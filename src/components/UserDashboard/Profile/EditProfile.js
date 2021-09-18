/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { setCartUsername } from '../../../redux/cartSlice';
import defaultProfilePic from "../../../media/defaultProfilePic.png"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { encrypt } from '../../Helpers/encryption';
import { updateUser } from '../../../redux/userReducers';
import LoadingSpinner from '../../Helpers/LoadingSpinner';

const EditProfile = ({ show }) => {
    const { user, userErrors, isUserLoading } = useSelector(state => state.user)
    const { cartUsername } = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const [file, setFile] = useState(null);

    useEffect(() => {
        if (user) {
            setValue("name", user.name)
            setValue("username", user.username)
            setValue("email", user.email)
            setValue("phone", user.phone)
        }
    }, [user]);

    // Useform hook with form pre-population
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: { ...user }
    })

    // Cascade username update in cart and wishlist collection 
    useEffect(() => {
        if (user.username !== cartUsername) {
            dispatch(setCartUsername(user.username))
        }
    }, [user.username]);

    // Custom form submit handler
    const updateFormSubmit = userEdited => {
        // Creating formData object
        const formData = new FormData()

        // Appending image to it
        if (file) {
            formData.append("profilePicture", file, file.name)
        }

        // Appending user object
        userEdited._id = user._id
        userEdited.cartUsername = cartUsername
        userEdited = encrypt(userEdited)

        formData.append("user", userEdited)

        dispatch(updateUser(formData))
    }
    const onFileSelect = (event) => {
        setFile(event.target.files[0])
    }
    return (
        <div>
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
                            <div className="form-floating mb-3">
                                <input
                                    type="text" className="form-control"
                                    id="floatingInput" placeholder="#" name="name"
                                    {...register("name", { required: true })} />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                        </div>
                        {/* Username */}
                        <div className="col-5">
                            <div className="form-floating mb-3">
                                <input
                                    type="text" className="form-control"
                                    id="floatingInput" placeholder="#" name="username"
                                    {...register("username", { required: true })} />
                                <label htmlFor="floatingInput">Username</label>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {/* Email */}
                        <div className="col-5">
                            <div className="form-floating mb-3">
                                <input
                                    type="email" className="form-control"
                                    id="floatingInput" placeholder="#" name="email"
                                    {...register("email", { required: true })} />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                        </div>
                        {/* Phone number */}
                        <div className="col-5">
                            <div className="form-floating mb-3">
                                <input
                                    type="number" className="form-control"
                                    id="floatingInput" placeholder="#" name="phone"
                                    {...register("phone")} />
                                <label htmlFor="floatingInput">Phone</label>
                            </div>
                        </div>

                    </div>
                    {errors.name?.type === "required" && <p className="alert alert-danger w-25 text-center mx-auto py-2 mt-2">Name is required</p>}
                    {errors.username?.type === "required" && <p className="alert alert-danger w-25 text-center mx-auto py-2 mt-2">Username is required</p>}
                    {errors.email?.type === "required" && <p className="alert alert-danger w-25 text-center mx-auto py-2 mt-2">Email is required</p>}
                    {userErrors && !show && <p className="alert alert-danger w-25 text-center mx-auto py-2 mt-2">{userErrors}</p>}
                    <div className="text-center mt-4 mb-5">
                        {isUserLoading && !show && <LoadingSpinner message=" Saving Changes..." />}
                        <button className="btn btn-danger mt-3" type="submit">Save</button>
                        <button className="btn btn-secondary mt-3 ms-4" type="reset" onClick={() => reset()}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
