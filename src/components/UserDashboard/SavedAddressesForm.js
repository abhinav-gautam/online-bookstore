import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, updateAddress } from '../../redux/userReducers';
import LoadingSpinner from '../Helpers/LoadingSpinner';

const SavedAddressesForm = ({ updateIndex, setShow, setUpdateIndex }) => {
    const { user, isUserLoading } = useSelector(state => state.user)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { ...user.addresses[updateIndex] }
    })
    const dispatch = useDispatch()

    const formSubmit = newAddress => {
        const userAddress = { username: user.username, address: newAddress }

        // Updating an Address
        if (updateIndex >= 0) {
            userAddress.index = updateIndex
            dispatch(updateAddress(userAddress))
            setUpdateIndex(-1)
            return setShow(false)
        }

        // Adding a new Address
        if (!JSON.stringify(user.addresses).includes(JSON.stringify(newAddress))) {
            dispatch(addAddress(userAddress))
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
                            <label for="floatingInput">Full Name</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Mobile Number */}
                        <div class="form-floating mb-3">
                            <input
                                type="text" class="form-control"
                                id="floatingInput" placeholder="#" name="mobNumber"
                                {...register("mobNumber", { required: true })} />
                            {errors.mobNumber?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Mobile Number is required</p>}
                            <label for="floatingInput">Mobile Number</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Flat, House no., Building, Company, Apartment */}
                        <div class="form-floating mb-3">
                            <input
                                type="text" class="form-control"
                                id="floatingInput" placeholder="#" name="houseNumber"
                                {...register("houseNumber", { required: true })} />
                            {errors.houseNumber?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">This field is required</p>}
                            <label for="floatingInput">Flat, House no., Building, Company, Apartment</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Area, Colony, Street, Sector, Village*/}
                        <div class="form-floating mb-3">
                            <input
                                type="text" class="form-control"
                                id="floatingInput" placeholder="#" name="area"
                                {...register("area", { required: true })} />
                            {errors.area?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">This field is required</p>}
                            <label for="floatingInput">Area, Colony, Street, Sector, Village</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Town, City */}
                        <div class="form-floating mb-3">
                            <input
                                type="text" class="form-control"
                                id="floatingInput" placeholder="#" name="city"
                                {...register("city", { required: true })} />
                            {errors.city?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">This field is required</p>}
                            <label for="floatingInput">Town, City</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Pin Code */}
                        <div class="form-floating mb-3">
                            <input
                                type="number" class="form-control"
                                id="floatingInput" placeholder="#" name="pin"
                                {...register("pin", { required: true, pattern: /^[0-9]{1,6}$/ })} />
                            {errors.pin?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Pin Code is required</p>}
                            {errors.pin?.type === "pattern" && <p className="alert alert-danger w-75 text-center mx-auto py-2 mt-2">Pin Code contains 6 digit number</p>}
                            <label for="floatingInput">Pin Code</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* State */}
                        <div class="form-floating mb-3">
                            <input
                                type="text" class="form-control"
                                id="floatingInput" placeholder="#" name="state"
                                {...register("state", { required: true })} />
                            {errors.state?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">State is required</p>}
                            <label for="floatingInput">State</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Area, Colony, Street, Sector, Village*/}
                        <div class="form-floating mb-3">
                            <input
                                type="text" class="form-control"
                                id="floatingInput" placeholder="#" name="country"
                                {...register("country", { required: true })} />
                            {errors.country?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Country is required</p>}
                            <label for="floatingInput">Country</label>
                        </div>
                    </div>
                </div>
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

export default SavedAddressesForm;
