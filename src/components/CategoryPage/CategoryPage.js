import React from 'react';
import { useParams } from 'react-router';
import CategorySidebar from '../HomePage/CategorySidebar';

const CategoryPage = () => {
    const { category } = useParams()

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
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
