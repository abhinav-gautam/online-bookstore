import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CategorySidebar from '../HomePage/CategorySidebar';
import BookTile from './BookTile';

const CategoryPage = () => {
    const { category } = useParams()

    const { books } = useSelector(state => state.books)

    // Getting all books from the category
    return (
        <div className="container-fluid">
            <div className="row">

                {/* Categories Sidebar */}
                <div className="col-2">
                    <CategorySidebar />
                </div>

                {/* Main Content */}
                <div className="col-10 border-start mt-4 mb-5 ps-5">
                    <div className="display-5 mt-5">{category} Books</div>
                    <div className="mt-3">{books.filter(book => book.category === category).length} books found</div>
                    {
                        books.filter(book => book.category === category).map(book => (
                            <BookTile book={book} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
