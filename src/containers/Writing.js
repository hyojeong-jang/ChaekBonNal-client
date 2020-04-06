import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveBookReport } from '../api/bookAPI'
import { bookSearchAPI } from '../api/bookSearchAPI';
import { receiveSearchResult } from '../action/index'

const Writing = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const isMember = localStorage.token;
    if (!isMember) history.push('/login');
    
    let word = '';
    let text = '';
    let title = '';
    let quote = ''

    const userName = useSelector(state => state.user.name);
    const selectedBook = useSelector(state => state.book.selected);
    const selectedCategory = useSelector(state => state.book.category);

    const getSearchWord = useCallback((e) => word = e.target.value);
    const getText = useCallback((e) => text = e.target.value);
    const getTitle = useCallback((e) => title = e.target.value);
    const getQuote = useCallback((e) => quote = e.target.value);

    const onClickSearchButton = useCallback(async () => {
        const searchResult = await bookSearchAPI(userName, word);
        dispatch(receiveSearchResult(searchResult));
        history.push(`/writing/book-search`);
    }, []);

    const onClickDoneButton = useCallback(async () => {
        await saveBookReport({
            userName,
            selectedBook,
            selectedCategory,
            text,
            title,
            quote
        })
        history.push('/');
    });

    return (
        <>
            <input type='search' name='bookSearch' onChange={getSearchWord} />
            <button onClick={onClickSearchButton}>Search</button>
            {
                selectedBook
                ? <div>
                    <input type='text' placeholder={selectedBook.title} />
                    <input type='text' placeholder={selectedBook.author} />
                    <input type='text' placeholder={selectedCategory} />
                </div>
                : []
            }
            <input className='title' type='text' onChange={getTitle} />
            <textarea className='text' rows='10' cols='50' onChange={getText}/>
            <input className='quote' type='text' onChange={getQuote} />
            <button onClick={onClickDoneButton}>Done</button>
        </>
    );
};

export default Writing
