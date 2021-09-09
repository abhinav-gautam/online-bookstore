import React from 'react';

const ProfileSidebar = () => {
    return (
        <div className="ps-5">
            <p className="h4">Useful Links</p>
            <div className="lh-6 mt-4 text-danger fw-bold">
                <p>Change Profile Picture</p>
                <p>Change Password</p>
                <p>Manage Saved Addresses</p>
                <p>Manage Saved Credit Cards</p>
            </div>
        </div>
    );
}

export default ProfileSidebar;
