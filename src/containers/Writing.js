import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bookSearchAPI } from '../api/bookSearchAPI';
import { receiveSearchResult } from '../action/index'

const Writing = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let word = '';

    const userName = useSelector(state => state.user.name);
    const searchWord = useCallback((e) => {
        word = e.target.value;
    })

    const onClick = useCallback(async () => {
        const searchResult = await bookSearchAPI(userName, word);
        dispatch(receiveSearchResult(searchResult));
        history.push(`/writing/book-search`);
    }, [])
    return (
        <>
            <input type='search' name='bookSearch' onChange={searchWord} />
            <button onClick={onClick}>Search</button>
        </>
    );
};

export default Writing
