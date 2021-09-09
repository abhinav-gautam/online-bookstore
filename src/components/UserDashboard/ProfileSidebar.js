import React from 'react';

const ProfileSidebar = () => {
    return (
        <div className="ps-5">
            <p className="h4">Useful Links</p>
            <div className="lh-6 mt-4 text-danger fw-bold">
                {/* <p className="cursor-pointer">Change Profile Picture</p> */}
                <p className="cursor-pointer">Change Password</p>
                <p className="cursor-pointer">Manage Saved Addresses</p>
                <p className="cursor-pointer">Manage Saved Credit Cards</p>
            </div>
        </div>
    );
}

export default ProfileSidebar;
