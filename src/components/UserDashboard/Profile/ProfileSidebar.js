import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ChangePasswordModal from './ChangePasswordModal';

const ProfileSidebar = ({ show, setShow, url }) => {
    const { user } = useSelector(state => state.user)

    return (
        <div className="ps-5">
            <p className="h4">Useful Links</p>
            <div className="mt-4 lh-6 text-danger fw-bold">
                {
                    user.role === "user"
                        ? <>
                            <p><Link className="cursor-pointer text-decoration-none text-danger" to={`${url}/addresses`}>Manage Saved Addresses</Link></p>
                            <p><Link className="cursor-pointer text-decoration-none text-danger" to={`${url}/cards`}>Manage Saved Credit Cards</Link></p>
                            <p className="cursor-pointer" onClick={() => setShow(true)}>Change Password</p>
                            <p><Link className="cursor-pointer text-decoration-none text-danger" to={`${url}`}>Edit Profile</Link></p>
                        </>
                        :
                        <p className="cursor-pointer" onClick={() => setShow(true)}>Change Password</p>
                }
            </div>
            {/* Change password modal */}
            <ChangePasswordModal show={show} setShow={setShow} />
        </div>
    );
}

export default ProfileSidebar;
