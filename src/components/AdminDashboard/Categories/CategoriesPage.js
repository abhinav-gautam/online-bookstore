import React, { useState } from 'react';
import AddCategory from './AddCategory';
import AllCategories from './AllCategories';
import EditCategory from './EditCategory';

const CategoriesPage = () => {
    const [show, setShow] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);

    return (
        <div className="container-fluid mt-5">
            <p className="h3">Categories</p>
            <div className="row mt-4 ">
                <div className="col-xl-5 border-end me-5 adm-addCategory">
                    {/* Add Category Form */}
                    <div className="h5">Add New Category</div>
                    <AddCategory />
                </div>
                <div className="col-xl-5 ms-5 adm-viewCategory">
                    {/* View All Categories */}
                    <div className="h5">All Categories</div>
                    <AllCategories setShow={setShow} setUpdateIndex={setUpdateIndex} />
                </div>
                {/* Edit Category Modal */}
                <EditCategory
                    show={show} setShow={setShow}
                    updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} />
            </div>
        </div>
    );
}

export default CategoriesPage;
