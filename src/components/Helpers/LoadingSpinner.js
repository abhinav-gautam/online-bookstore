import React from 'react';

const LoadingSpinner = ({ message }) => {
    return (
        <div>
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden"></span>
            </div>
            <span className="text-success"> {message}</span>
        </div>
    );
}

export default LoadingSpinner;
