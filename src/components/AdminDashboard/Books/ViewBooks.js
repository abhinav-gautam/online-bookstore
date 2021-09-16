import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteBook } from '../../../redux/booksReducers';
import LoadingSpinner from '../../Helpers/LoadingSpinner';

const ViewBooks = ({ setShow, setUpdateIndex }) => {
    const dispatch = useDispatch()
    const { books, isBooksLoading } = useSelector(state => state.books)
    return (
        <div className="container-fluid mt-5">
            <div className="h4">All Books</div>
            <div className="pe-5 mt-4">
                <div className="table-responsive">
                    <table className="table table-bordered table-sm ">
                        <thead className="table-danger">
                            <tr className="text-center align-top">
                                <th>S.no.</th>
                                <th>Cover</th>
                                <th>ISBN</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Rating</th>
                                <th>Release Date</th>
                                <th>Description</th>
                                <th>Height</th>
                                <th>Weight</th>
                                <th>Width</th>
                                <th>Pages</th>
                                <th>Language</th>
                                <th>Binding</th>
                                <th>Tags</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books
                                    ? books.map((book, index) => [
                                        <tr key={index}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center"><img src={book.bookImage} width="100px" height="110px" alt="" /></td>
                                            <td>{book.isbn}</td>
                                            <td>{book.bookTitle}</td>
                                            <td>{book.author}</td>
                                            <td>{book.category}</td>
                                            <td>Rs.{book.price}</td>
                                            <td>{book.discount}</td>
                                            <td>{book.rating}</td>
                                            <td>{book.releaseDate}</td>
                                            <td>{book.description.split(" ").length > 5 ? book.description.split(" ").slice(0, 5).join(" ") + "..." : book.description}</td>
                                            <td>{book.height}</td>
                                            <td>{book.weight}</td>
                                            <td>{book.width}</td>
                                            <td>{book.pages}</td>
                                            <td>{book.language}</td>
                                            <td>{book.binding}</td>
                                            <td>{book.tags}</td>
                                            <td className="text-center">
                                                <span className="text-success cursor-pointer" onClick={() => { setShow(true); setUpdateIndex(index) }}><FontAwesomeIcon icon={faEdit} /></span>
                                                <span className="ms-2 text-danger cursor-pointer" onClick={() => dispatch(deleteBook({ bookId: book._id, index }))}><FontAwesomeIcon icon={faTrashAlt} /></span>
                                            </td>
                                        </tr>
                                    ])
                                    : <tr className="text-center"><td colSpan="3">No Records Found</td></tr>
                            }
                            {
                                isBooksLoading &&
                                <tr className="text-center"><td colSpan="3"><LoadingSpinner message="Loading Addresses..." /></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewBooks;
