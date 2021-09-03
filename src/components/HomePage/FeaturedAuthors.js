import React from 'react';
import LoadingSpinner from '../Helpers/LoadingSpinner';

const FeaturedAuthors = ({ featuredAuthors, isFeaturedAuthorsLoading }) => {
    return (
        <>
            <div className="display-5 mt-5">Featured Authors</div>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-5 mt-3 ">
                {
                    isFeaturedAuthorsLoading &&
                    <LoadingSpinner message=" Loading Books..." />
                }
                {
                    featuredAuthors?.length
                    &&
                    featuredAuthors.map(author => (
                        <div key={author._id} >
                            <img src={author.authorImage} className="border border-white rounded-circle img-small" alt="" width="150px" height="150px" />
                            <p className="ms-4 mt-3">{author.authorName}</p>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default FeaturedAuthors;
