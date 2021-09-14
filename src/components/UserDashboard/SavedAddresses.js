import React, { useState } from 'react';
import SavedAddressEdit from './SavedAddressEdit';

import SavedAddressesForm from './SavedAddressesForm';
import SavedAddressesTable from './SavedAddressesTable';

const SavedAddresses = () => {
    const [show, setShow] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);
    return (
        <div>
            {/* Saved Addresses Table */}
            <p className="h4 mt-4">Your Saved Addresses</p>
            <SavedAddressesTable setShow={setShow} setUpdateIndex={setUpdateIndex} />
            {/* Saved Addresses Form */}
            <p className="h4 mt-4">Add New Address</p>
            <SavedAddressesForm />
            {/* Saved Address Edit Modal */}
            <SavedAddressEdit show={show} setShow={setShow} setUpdateIndex={setUpdateIndex} updateIndex={updateIndex} />
        </div>
    );
}

export default SavedAddresses;
