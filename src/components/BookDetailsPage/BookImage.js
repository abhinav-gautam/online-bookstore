import React from 'react';

const BookImage = ({ book, width, height }) => {
    return (
        <div className="position-relative">
            <img src={book.bookImage} alt="" width={width} height={height} />
            {
                book.discount &&
                <span className="position-absolute top-0 start-0 fs-6 translate-middle badge rounded-circle bg-danger p-2">
                    {book.discount}% <br /> off
                    <span className="visually-hidden">discount</span>
                </span>
            }
        </div>
    );
}

export default BookImage;
