import React from 'react';
import { Modal } from 'react-bootstrap';
import AddBooks from './AddBooks';

const EditBook = ({ show, setShow, updateIndex, setUpdateIndex }) => {
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddBooks updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} setShow={setShow} />
            </Modal.Body>
        </Modal>
    );
}

export default EditBook;
