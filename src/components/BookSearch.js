import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isbnAPI } from '../api/bookSearchAPI';
import { useHistory } from 'react-router-dom';
import { selectedBook } from '../action/index';
// import { saveBookInfo } from '../api/bookAPI'

const BookSearch = () => {
    const userName = useSelector(state => state.user.name);
    const searchList = useSelector(state => state.book.searchList);
    const history = useHistory();
    const dispatch = useDispatch();

    const getIsbn = useCallback(async (el) => {
        const isbn = el.isbn;
        const category = await isbnAPI(userName, isbn);
        history.push('/writing');
        dispatch(selectedBook(el, category));
    })
    return (
        <div>
            {
                searchList.map((el, index) => {
                    return (
                        <div key={index} onClick={() => getIsbn(el)}>
                            <img src={el.image} />
                            {el.author}
                            {el.publisher}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default BookSearch
