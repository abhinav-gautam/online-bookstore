import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addBook, updateBook } from '../../../redux/booksReducers';
import LoadingSpinner from '../../Helpers/LoadingSpinner';

const AddBooks = ({ updateIndex, setUpdateIndex, setShow }) => {
    const { books, isBooksLoading } = useSelector(state => state.books)
    const { categories } = useSelector(state => state.category)

    const dispatch = useDispatch()

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: { ...books[updateIndex], bookImage: "" }
    })
    const watchBookImage = watch("bookImage", [])

    const formSubmit = newBook => {
        const formData = new FormData()
        // Updating the book
        if (updateIndex >= 0) {
            // If new book image is given add it in the form data else use the old link
            if (newBook.bookImage) {
                formData.append("bookImage", newBook.bookImage[0], newBook.bookImage[0].name)
            } else {
                newBook.bookImage = books[updateIndex].bookImage
            }
            // Adding book in form data
            formData.append("book", JSON.stringify(newBook))
            // Dispatching update action
            dispatch(updateBook({ formData, index: updateIndex }))
            // Making updateIndex and show back to default
            setUpdateIndex(-1)
            setShow(false)
        }
        // Adding the book
        else {
            // Adding book image to form data
            formData.append("bookImage", newBook.bookImage[0], newBook.bookImage[0].name)
            delete newBook.bookImage
            // Adding book in form data
            formData.append("book", JSON.stringify(newBook))
            // Dispatching add action
            dispatch(addBook(formData))
        }
        reset()
    }

    return (
        <div className={updateIndex < 0 ? "container-fluid mt-5" : "container-fluid"}>
            {
                updateIndex < 0 &&
                < div className="h4">Add Book</div>
            }
            <form className="mt-4" onSubmit={handleSubmit(formSubmit)}>
                <div className="row">
                    <div className="col-6 d-flex">
                        {/* Book Image */}
                        <div className={watchBookImage.length === 0 ? "form-group mb-3 w-100" : "form-group mb-3 w-50"}>
                            <label htmlFor="floatingInput">Book Cover</label>
                            {
                                updateIndex < 0
                                    ?
                                    <input
                                        type="file" className="form-control" accept="image/*"
                                        id="floatingInput" placeholder="#" name="bookImage"
                                        {...register("bookImage", { required: true })} />
                                    :
                                    <input
                                        type="file" className="form-control" accept="image/*"
                                        id="floatingInput" placeholder="#" name="bookImage"
                                        {...register("bookImage")} />
                            }
                            {errors.bookImage?.type === "required" && <p className="text-danger mt-1">Book Cover is required</p>}
                        </div>
                        {
                            watchBookImage.length !== 0 &&
                            <div className="ms-5 mb-3">
                                <img src={URL.createObjectURL(watchBookImage[0])} width="100px" alt="" />
                            </div>
                        }
                    </div>
                    <div className="col-6">
                        {/* ISBN */}
                        <div className="form-floating mb-3">
                            <input
                                type="number" className="form-control"
                                id="floatingInput" placeholder="#" name="isbn"
                                {...register("isbn", { required: true })} />
                            {errors.isbn?.type === "required" && <p className="text-danger mt-1">ISBN is required</p>}
                            <label htmlFor="floatingInput">ISBN</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Book Title */}
                        <div className="form-floating mb-3">
                            <input
                                type="text" className="form-control"
                                id="floatingInput" placeholder="#" name="bookTitle"
                                {...register("bookTitle", { required: true })} />
                            {errors.bookTitle?.type === "required" && <p className="text-danger mt-1">Book Title is required</p>}
                            <label htmlFor="floatingInput">Book Title</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Author */}
                        <div className="form-floating mb-3">
                            <input
                                type="text" className="form-control"
                                id="floatingInput" placeholder="#" name="author"
                                {...register("author", { required: true })} />
                            {errors.author?.type === "required" && <p className="text-danger mt-1">Author is required</p>}
                            <label htmlFor="floatingInput">Author</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Category */}
                        <div class="form-floating mb-3">
                            <select
                                class="form-select" id="floatingSelect" name="category"
                                {...register("category", { required: true })}
                            >
                                <option value="">Choose...</option>
                                {
                                    categories.map((category, index) => (
                                        <option value={category.categoryName} key={index}>{category.categoryName}</option>
                                    ))
                                }
                            </select>
                            {errors.category?.type === "required" && <p className="text-danger mt-1">Category is required</p>}
                            <label for="floatingSelect">Category</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Price */}
                        <div className="form-floating input-group">
                            <span className="input-group-text">Rs.</span>
                            <input
                                type="number" className="form-control" step=".01"
                                id="floatingInput" placeholder="#" name="price"
                                {...register("price", { required: true })} />
                            <label htmlFor="floatingInput" className="ms-5">Price</label>
                        </div>
                        {errors.price?.type === "required" && <p className="text-danger mt-1">Price is required</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Discount*/}
                        <div className="form-floating input-group">
                            <input
                                type="number" className="form-control"
                                id="floatingInput" placeholder="#" name="discount"
                                {...register("discount")} />
                            <span className="input-group-text">%</span>
                            <label htmlFor="floatingInput">Discount</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Rating*/}
                        <div className="form-floating mb-3">
                            <input
                                type="number" className="form-control" step=".01"
                                id="floatingInput" placeholder="#" name="rating"
                                {...register("rating", { required: true })} />
                            {errors.rating?.type === "required" && <p className="text-danger mt-1">Rating is required</p>}
                            <label htmlFor="floatingInput">Rating</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Release Date*/}
                        <div className="form-floating mb-3">
                            <input
                                type="date" className="form-control"
                                id="floatingInput" placeholder="#" name="releaseDate"
                                {...register("releaseDate", { required: true })} />
                            {errors.releaseDate?.type === "required" && <p className="text-danger mt-1">Release Date is required</p>}
                            <label htmlFor="floatingInput">Release Date</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Description */}
                        <div class="form-floating mb-3">
                            <textarea class="form-control" placeholder="#"
                                id="floatingTextarea" name="description"
                                {...register("description", { required: true })} ></textarea>
                            {errors.description?.type === "required" && <p className="text-danger mt-1">Description is required</p>}
                            <label for="floatingTextarea">Description</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Height */}
                        <div className="form-floating mb-3">
                            <input
                                type="number" className="form-control"
                                id="floatingInput" placeholder="#" name="height"
                                {...register("height", { required: true })} />
                            {errors.height?.type === "required" && <p className="text-danger mt-1">Height is required</p>}
                            <label htmlFor="floatingInput">Height</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Weight */}
                        <div className="form-floating mb-3">
                            <input
                                type="number" className="form-control"
                                id="floatingInput" placeholder="#" name="weight"
                                {...register("weight", { required: true })} />
                            {errors.weight?.type === "required" && <p className="text-danger mt-1">Weight is required</p>}
                            <label htmlFor="floatingInput">Weight</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Width */}
                        <div className="form-floating mb-3">
                            <input
                                type="number" className="form-control"
                                id="floatingInput" placeholder="#" name="width"
                                {...register("width", { required: true })} />
                            {errors.width?.type === "required" && <p className="text-danger mt-1">Width is required</p>}
                            <label htmlFor="floatingInput">Width</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Pages*/}
                        <div className="form-floating mb-3">
                            <input
                                type="number" className="form-control"
                                id="floatingInput" placeholder="#" name="pages"
                                {...register("pages", { required: true })} />
                            {errors.pages?.type === "required" && <p className="text-danger mt-1">Pages is required</p>}
                            <label htmlFor="floatingInput">Pages</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Language*/}
                        <div className="form-floating mb-3">
                            <input
                                type="text" className="form-control"
                                id="floatingInput" placeholder="#" name="language"
                                {...register("language", { required: true })} />
                            {errors.language?.type === "required" && <p className="text-danger mt-1">Language is required</p>}
                            <label htmlFor="floatingInput">Language</label>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* Binding */}
                        <div className="form-floating mb-3">
                            <input
                                type="text" className="form-control"
                                id="floatingInput" placeholder="#" name="binding"
                                {...register("binding", { required: true })} />
                            {errors.binding?.type === "required" && <p className="text-danger mt-1">Binding is required</p>}
                            <label htmlFor="floatingInput">Binding</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* Tags */}
                        <div className="form-floating mb-3">
                            <input
                                type="text" className="form-control"
                                id="floatingInput" placeholder="#" name="tags"
                                {...register("tags")} />
                            <label htmlFor="floatingInput">Tags</label>
                        </div>
                    </div>
                    <div className="col-6">
                    </div>
                </div>
                <div className="text-center mt-4 mb-2">
                    {isBooksLoading && <LoadingSpinner message=" Saving Changes..." />}
                    {
                        updateIndex < 0
                            ?
                            <button className="btn btn-danger mt-3" type="submit">Add</button>
                            :
                            <button className="btn btn-danger mt-3" type="submit">Update</button>
                    }
                    <button className="btn btn-secondary mt-3 ms-4" type="reset" onClick={() => reset()}>Reset</button>
                </div>
            </form>
        </div >
    );
}

export default AddBooks;
