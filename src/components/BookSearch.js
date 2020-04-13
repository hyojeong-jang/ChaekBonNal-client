import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isbnAPI } from '../api/bookSearchAPI';
import { useHistory } from 'react-router-dom';
import { selectedBook } from '../action/index';

const BookSearch = () => {
    const userToken = localStorage.token;
    const searchList = useSelector(state => state.book.searchList);

    const history = useHistory();
    const dispatch = useDispatch();

    const getIsbn = useCallback(async (book) => {
        const isbn = book.isbn;
        const category = await isbnAPI(userToken, isbn);

        dispatch(selectedBook(book, category));
        history.goBack(1);
    })
    return (
        <div>
            {
                searchList
                && searchList.map((book, index) => {
                    return (
                        <div key={index} onClick={() => getIsbn(book)}>
                            <img src={book.image} />
                            {book.author}
                            {book.publisher}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default BookSearch
