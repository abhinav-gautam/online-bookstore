import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const SearchBar = ({ offcanvas, setShow }) => {
    const { register, handleSubmit, reset } = useForm();
    const { user, isAuth } = useSelector(state => state.user)
    const history = useHistory()
    const onSearchFormSubmit = searchField => {
        history.push(`/search?query=${searchField.searchQuery}`)
        setShow(false)
        reset()
    }
    return (
        <>
            {
                (!isAuth || user.role === "user") &&
                <form className={`d-flex ${!offcanvas && "mx-auto w-75"}`} onSubmit={handleSubmit(onSearchFormSubmit)}>
                    <input
                        className="form-control me-2"
                        type="search" name="searchQuery"
                        placeholder="Search by Title, Author, Publisher or ISBN"
                        {...register("searchQuery", { required: true })} />
                    <button className="btn btn-outline-danger" type="submit">Search</button>
                </form>
            }
        </>
    );
}

export default SearchBar;
