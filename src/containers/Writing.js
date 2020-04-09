import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { saveBookReport } from '../api/bookAPI'
import { bookSearchAPI } from '../api/bookSearchAPI';
import { receiveSearchResult, drafts } from '../action/index'

const Writing = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const isMember = localStorage.token;
    if (!isMember) {
        history.push('/login');
    }

    const draftsTitle = useSelector(state => state.bookReports.title);
    const draftsText = useSelector(state => state.bookReports.text);
    const [ text, setText ] = useState(draftsText);
    const [ title, setTitle ] = useState(draftsTitle);
    let word = '';

    const userName = useSelector(state => state.user.name);
    const imageUrl = useSelector(state => state.bookReports.image);
    const quote = useSelector(state => state.bookReports.quote);
    const selectedBook = useSelector(state => state.book.selected);
    const selectedCategory = useSelector(state => state.book.category);

    const onClickSearchButton = useCallback(async () => {
        const searchResult = await bookSearchAPI(userName, word);
        dispatch(receiveSearchResult(searchResult));
        history.push(`/writing/book-search`);
    }, []);

    const onClickAddImageButton = useCallback(() => {
        dispatch(drafts(text, title));
    })

    const onClickDoneButton = useCallback(async () => {
        await saveBookReport({
            userName,
            selectedBook,
            selectedCategory,
            imageUrl,
            text,
            title,
            quote
        })
        history.push('/');
    });
    
    return (
        <>
            <input type='search'
                name='bookSearch'
                onChange={(e) => word = e.target.value}
            />
            <button
                onClick={onClickSearchButton}
            >Search</button>
            {
                selectedBook
                ? <div>
                    <input type='text' placeholder={selectedBook.title} />
                    <input type='text' placeholder={selectedBook.author} />
                    <input type='text' placeholder={selectedCategory} />
                </div>
                : []
            }
            <img src={imageUrl} />
            <Link to='/writing/attaching-image'>
                <button
                    onClick={onClickAddImageButton}
                >책 사진 넣기</button>
            </Link>
            <input 
                className='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className='text'
                rows='10'
                cols='50'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                className='quote'
                type='text'
                value={quote}
            />
            <button
                onClick={onClickDoneButton}
            >Done</button>
        </>
    );
};

export default Writing
