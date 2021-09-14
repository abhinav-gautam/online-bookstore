import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteAddress } from '../../../redux/userReducers';
import LoadingSpinner from '../../Helpers/LoadingSpinner';

const SavedAddressesTable = ({ setShow, setUpdateIndex }) => {
    const { user, isUserLoading } = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <div className="pe-5 mt-4">
            <table className="table table-bordered ">
                <thead className="table-danger">
                    <tr className="text-center">
                        <th>S.no.</th>
                        <th>Address</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.addresses
                            ? user.addresses.map((address, index) => [
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{Object.values(address).join(", ")}</td>
                                    <td className="text-center">
                                        <span className="text-success cursor-pointer" onClick={() => { setShow(true); setUpdateIndex(index) }}><FontAwesomeIcon icon={faEdit} /></span>
                                        <span className="ms-2 text-danger cursor-pointer" onClick={() => dispatch(deleteAddress({ user: { username: user.username, address }, index }))}><FontAwesomeIcon icon={faTrashAlt} /></span>
                                    </td>
                                </tr>
                            ])
                            : <tr className="text-center"><td colSpan="3">No Records Found</td></tr>
                    }
                    {
                        isUserLoading &&
                        <tr className="text-center"><td colSpan="3"><LoadingSpinner message="Loading Addresses..." /></td></tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default SavedAddressesTable;
