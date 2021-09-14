import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, updateCard } from '../../../redux/userReducers';
import { decrypt, encrypt } from '../../Helpers/encryption';
import LoadingSpinner from '../../Helpers/LoadingSpinner';

const SavedCardsForm = ({ updateIndex, setShow, setUpdateIndex }) => {
    const { user, isUserLoading } = useSelector(state => state.user)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { ...decrypt(user.cards[updateIndex]) }
    })
    const dispatch = useDispatch()
    const formSubmit = newCard => {
        const userCard = { username: user.username, card: encrypt(newCard) }

        // Updating an Card
        if (updateIndex >= 0) {
            userCard.index = updateIndex
            dispatch(updateCard(userCard))
            setUpdateIndex(-1)
            return setShow(false)
        }
        // Adding a new Card
        if (!JSON.stringify(user.cards).includes(JSON.stringify(newCard))) {
            dispatch(addCard(userCard))
            reset()
        }
    }
    return (
        <div>
            <form className="mt-4 pe-5" onSubmit={handleSubmit(formSubmit)}>
                <div className="row">
                    <div className="col-6">
                        {/* Full Name */}
                        <div class="form-floating mb-3">
                            <input
                                type="text" class="form-control"
                                id="floatingInput" placeholder="#" name="fullName"
                                {...register("fullName", { required: true })} />
                            {errors.fullName?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Full Name is required</p>}
                            <label for="floatingInput">Name on Card</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Expiry Date */}
                        <div class="form-floating mb-3">
                            <input
                                type="month" class="form-control"
                                id="floatingInput" placeholder="#" name="expiry"
                                {...register("expiry", { required: true })} />
                            {errors.expiry?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">This field is required</p>}
                            <label for="floatingInput">Expiry Date</label>
                        </div>
                    </div>
                </div>
                {
                    (updateIndex < 0 || updateIndex === undefined) &&
                    <div className="row">
                        <div className="col-6">
                            {/* Card Number */}
                            <div class="form-floating mb-3">
                                <input
                                    type="number" class="form-control"
                                    id="floatingInput" placeholder="#" name="cardNumber"
                                    {...register("cardNumber", { required: true })} />
                                {errors.cardNumber?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Card Number is required</p>}
                                <label for="floatingInput">Card Number</label>
                            </div>
                        </div>

                    </div>
                }
                <div className="text-center mt-4 mb-5">
                    {isUserLoading && <LoadingSpinner message=" Saving Changes..." />}
                    {
                        !updateIndex
                            ?
                            <button className="btn btn-danger mt-3" type="submit">Save</button>
                            :
                            <button className="btn btn-danger mt-3" type="submit">Update</button>
                    }
                    <button className="btn btn-secondary mt-3 ms-4" type="reset" onClick={() => reset()}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default SavedCardsForm;
