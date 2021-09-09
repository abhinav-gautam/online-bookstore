import React from 'react';
import defaultProfilePic from "../../media/defaultProfilePic.png"
import { useSelector } from 'react-redux';
import ProfileSidebar from './ProfileSidebar';

const ProfilePage = () => {
    const { user } = useSelector(state => state.user)
    return (
        <>
            <div className="container-fluid top-margin-150 ">
                <div className="row mt-5">
                    <div className="col-12 col-md-8 ps-5 border-end">
                        <p className="h3">Welcome {user.username.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}</p>
                        <p className="h4 mt-4">Edit your profile</p>
                        <div className="text-center mt-4">
                            {
                                user.profilePicture
                                    ?
                                    <img src={user.profilePicture} alt="" />
                                    :
                                    <img src={defaultProfilePic} className="border border-dark rounded-circle" width="200px" alt="" />
                            }
                        </div>
                        <div className="">
                            <form className="mt-5 ">
                                <div className="row justify-content-center">
                                    {/* Name */}
                                    <div className="col-5">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput" placeholder="#" name="name" />
                                            <label for="floatingInput">Name</label>
                                        </div>
                                    </div>
                                    {/* Username */}
                                    <div className="col-5">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput" placeholder="#" name="username" />
                                            <label for="floatingInput">Username</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    {/* Email */}
                                    <div className="col-5">
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" id="floatingInput" placeholder="#" name="email" />
                                            <label for="floatingInput">Email</label>
                                        </div>
                                    </div>
                                    {/* Phone number */}
                                    <div className="col-5">
                                        <div class="form-floating mb-3">
                                            <input type="number" class="form-control" id="floatingInput" placeholder="#" name="phone" />
                                            <label for="floatingInput">Phone Number</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-4 mb-5">
                                    <button className="btn btn-danger">Save</button>
                                    <button className="btn btn-secondary ms-4">Reset</button>
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
