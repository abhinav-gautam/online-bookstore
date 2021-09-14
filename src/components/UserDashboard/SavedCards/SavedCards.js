import React, { useState } from 'react';
import SavedCardEdit from './SavedCardEdit';

import SavedCardsForm from './SavedCardsForm';
import SavedCardsTable from './SavedCardsTable';

const SavedCards = () => {
    const [show, setShow] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);
    return (
        <div>
            {/* Saved Cards Table */}
            <p className="h4 mt-4">Your Saved Cards</p>
            <SavedCardsTable setShow={setShow} setUpdateIndex={setUpdateIndex} />
            {/* Saved Cards Form */}
            <p className="h4 mt-4">Add New Card</p>
            <SavedCardsForm />
            {/* Saved Card Edit Modal */}
            <SavedCardEdit show={show} setShow={setShow} setUpdateIndex={setUpdateIndex} updateIndex={updateIndex} />
        </div>
    );
}

export default SavedCards;
