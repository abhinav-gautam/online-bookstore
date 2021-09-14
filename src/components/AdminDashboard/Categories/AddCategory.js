import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addCategory, updateCategory } from '../../../redux/categoryReducers';
import LoadingSpinner from '../../Helpers/LoadingSpinner';

const AddCategory = ({ updateIndex, setUpdateIndex, setShow }) => {
    const { categories, isCategoryLoading } = useSelector(state => state.category)

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { ...categories[updateIndex] }
    })

    const formSubmit = category => {
        if (updateIndex >= 0) {
            dispatch(updateCategory({ category, index: updateIndex }))
            setUpdateIndex(-1)
            return setShow(false)
        }
        if (categories.findIndex(cat => cat.categoryName === category.categoryName) < 0) {
            dispatch(addCategory(category))
        }
        reset()
    }

    return (
        <div>
            <form className={updateIndex >= 0 ? "mt-4" : "w-75 mt-4"} onSubmit={handleSubmit(formSubmit)}>
                {/* Category Name */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="categoryName"
                        {...register("categoryName", { required: true })} />
                    {errors.categoryName?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Category Name is required</p>}
                    <label for="floatingInput">Category Name</label>
                </div>
                <div className="text-center mt-4 mb-5">
                    {isCategoryLoading && <LoadingSpinner message=" Saving Changes..." />}
                    {
                        !updateIndex
                            ?
                            <button className="btn btn-danger mt-3" type="submit">Add</button>
                            :
                            <button className="btn btn-danger mt-3" type="submit">Update</button>
                    }
                    <button className="btn btn-secondary mt-3 ms-4" type="reset" onClick={() => reset()}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default AddCategory;
