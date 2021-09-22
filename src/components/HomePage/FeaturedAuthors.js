import React from 'react';
import { useHistory } from 'react-router';
import LoadingSpinner from '../Helpers/LoadingSpinner';

const FeaturedAuthors = ({ authors, isAuthorsLoading }) => {
    const history = useHistory()
    return (
        <>
            <div className="display-5 mt-5">Featured Authors</div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 mt-3 ">
                {
                    isAuthorsLoading
                        ? <LoadingSpinner message=" Loading Authors..." />
                        : authors?.length
                            ?
                            authors.slice(0, 5).map(author => (
                                <div key={author._id} >
                                    <img src={author.authorImage} className="border border-white rounded-circle img-small cursor-pointer" onClick={() => history.push({ pathname: `/author/${author.authorName}`, state: { authorImage: author.authorImage, authorAbout: author.authorAbout } })} alt="" width="150px" height="150px" />
                                    <p className="ms-4 mt-3 cursor-pointer" onClick={() => history.push({ pathname: `/author/${author.authorName}`, state: { authorImage: author.authorImage, authorAbout: author.authorAbout } })}>{author.authorName}</p>
                                </div>
                            ))
                            : <p className="lead">Nothing to show here</p>
                }
            </div>
        </>
    );
}

export default FeaturedAuthors;
