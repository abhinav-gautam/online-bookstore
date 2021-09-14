import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteCard } from '../../../redux/userReducers';
import { decrypt } from '../../Helpers/encryption';
import LoadingSpinner from '../../Helpers/LoadingSpinner';

const SavedCardsTable = ({ setShow, setUpdateIndex }) => {
    const { user, isUserLoading } = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <div className="pe-5 mt-4">
            <table className="table table-bordered ">
                <thead className="table-danger">
                    <tr className="text-center">
                        <th>S.no.</th>
                        <th>Card</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.cards
                            ? user.cards.map(cardEnc => decrypt(cardEnc)).map((card, index) => (
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>
                                        <p><strong>Name on Card:</strong> {card.fullName}</p>
                                        <p><strong>Card ending with:</strong> {card.cardNumber.slice(-4)}</p>
                                        <p><strong>Expiry Date:</strong> {card.expiry}</p>
                                    </td>
                                    <td className="text-center">
                                        <span className="text-success cursor-pointer" onClick={() => { setShow(true); setUpdateIndex(index) }}><FontAwesomeIcon icon={faEdit} /></span>
                                        <span className="ms-2 text-danger cursor-pointer" onClick={() => dispatch(deleteCard({ user: { username: user.username, card }, index }))}><FontAwesomeIcon icon={faTrashAlt} /></span>
                                    </td>
                                </tr>
                            ))
                            : <tr className="text-center"><td colSpan="3">No Records Found</td></tr>
                    }
                    {
                        isUserLoading &&
                        <tr className="text-center"><td colSpan="3"><LoadingSpinner message="Loading Cards..." /></td></tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default SavedCardsTable;
