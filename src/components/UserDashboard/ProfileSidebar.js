import React, { useState } from 'react';
import ChangePasswordModal from './ChangePasswordModal';

const ProfileSidebar = ({ show, setShow }) => {

    return (
        <div className="ps-5">
            <p className="h4">Useful Links</p>
            <div className="lh-6 mt-4 text-danger fw-bold">
                {/* <p className="cursor-pointer">Change Profile Picture</p> */}
                <p className="cursor-pointer" onClick={() => setShow(true)}>Change Password</p>
                <p className="cursor-pointer">Manage Saved Addresses</p>
                <p className="cursor-pointer">Manage Saved Credit Cards</p>
            </div>
            {/* Change password modal */}
            <ChangePasswordModal show={show} setShow={setShow} />
        </div>
    );
}

export default ProfileSidebar;
