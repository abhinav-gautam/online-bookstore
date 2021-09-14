import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { decrypt } from '../../Helpers/encryption';
import SavedCardsForm from './SavedCardsForm';

const SavedCardEdit = ({ show, setShow, updateIndex, setUpdateIndex }) => {
    const { user } = useSelector(state => state.user)

    return (
        <Modal
            show={show}
            size="xl"
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Card ending with {decrypt(user.cards[updateIndex])?.cardNumber?.slice(-4)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SavedCardsForm updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} setShow={setShow} />
            </Modal.Body>
        </Modal>
    );
}

export default SavedCardEdit;
