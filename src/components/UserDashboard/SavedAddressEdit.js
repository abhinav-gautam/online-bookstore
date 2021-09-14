import React from 'react';
import { Modal } from 'react-bootstrap';
import SavedAddressesForm from './SavedAddressesForm';

const SavedAddressEdit = ({ show, setShow, updateIndex }) => {

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
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SavedAddressesForm updateIndex={updateIndex} setShow={setShow} />
            </Modal.Body>
        </Modal>
    );
}

export default SavedAddressEdit;
