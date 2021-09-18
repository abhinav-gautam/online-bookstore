/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import CategoryItem from './CategoryItem';

const CategorySidebar = () => {
    const { categories, isCategoryLoading } = useSelector(state => state.category)

    return (
        <div className="container mt-5 ">
            <div className="h3">Categories</div>
            <ul className="list-unstyled mt-3">
                {
                    categories.length
                        ?
                        categories.map(category => (
                            <CategoryItem category={category} />
                        ))
                        : isCategoryLoading &&
                        <LoadingSpinner message=" Loading Categories..." />
                }
            </ul>
            <hr />
        </div>
    );
}

export default CategorySidebar;
