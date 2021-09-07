import React from 'react';

const AboutBook = ({ book }) => {
    return (
        <div>
            <div className="display-6 mt-5">About the Book</div>
            <p className="lead mt-2">{book.description}</p>
            <hr className="mt-5" />
            <div className="display-6 mt-5">Book Details</div>
            <div className="d-flex lh-lg">
                <div className="mt-2">
                    <div className="lead fw-bold">ISBN:</div>
                    <div className="lead fw-bold">Publisher:</div>
                    <div className="lead fw-bold">Release Date:</div>
                    <div className="lead fw-bold">Height:</div>
                    <div className="lead fw-bold">Weight:</div>
                </div>
                <div className="mt-2 ms-5 me-5">
                    <div className="lead">{book.isbn}</div>
                    <div className="lead">{book.publisher}</div>
                    <div className="lead">{book.releaseDate}</div>
                    <div className="lead">223 mm</div>
                    <div className="lead">481 gm</div>
                </div>
                <div className="mt-2">
                    <div className="lead fw-bold">Width:</div>
                    <div className="lead fw-bold">No of Pages:</div>
                    <div className="lead fw-bold">Language:</div>
                    <div className="lead fw-bold">Binding:</div>
                    <div className="lead fw-bold">Returnable:</div>
                </div>
                <div className="mt-2 ms-5">
                    <div className="lead">161 mm</div>
                    <div className="lead">322</div>
                    <div className="lead">English</div>
                    <div className="lead">Hardback</div>
                    <div className="lead">No</div>
                </div>
            </div>
        </div>
    );
}

export default AboutBook;
