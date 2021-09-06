import React from 'react';
import BooksSidebarBook from './BooksSidebarBook';

const BooksSidebarStip = ({ title, books }) => {
    return (
        <>
            <div className="ms-4 mt-5">
                <div className="h3">{title}</div>
                <div className="d-flex flex-column">
                    {
                        books.map(book => (
                            <BooksSidebarBook book={book} />
                        ))
                    }
                </div>
            </div>
            <hr className="mt-5" />
        </>
    );
}

export default BooksSidebarStip;
