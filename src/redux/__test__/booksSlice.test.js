import reducer, { addToRecentlyViewed, initialBooksState } from '../booksSlice';

it('checks addToRecentlyViewed working properly', () => {
    expect(reducer(initialBooksState, addToRecentlyViewed({
        _id: 1,
        bookTitle: "some book"
    }))).toEqual({
        ...initialBooksState, recentlyViewed: [{
            _id: 1,
            bookTitle: "some book"
        }]
    })
});
