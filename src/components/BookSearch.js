import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { isbnAPI } from '../api/bookSearchAPI';

const BookSearch = () => {
    const userName = useSelector(state => state.user.name);
    const bookInfo = useSelector(state => state.book.info);
    const getIsbn = useCallback(async (el) => {
        const isbn = el.isbn;
        const result = await isbnAPI(userName, isbn);
        console.log(result);
    })
    return (
        <div>
            {
                bookInfo.map((el, index) => {
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
