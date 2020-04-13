import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import * as api from '../api/bookAPI';
import * as actions from '../action/index';
import { bookSearchAPI } from '../api/bookSearchAPI';

const Writing = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userToken = localStorage.token;

    if (!userToken) {
        history.push('/login');
    }

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const text = useSelector(state => state.bookReports.text);
    const quote = useSelector(state => state.bookReports.quote);
    const title = useSelector(state => state.bookReports.title);
    const imageUrl = useSelector(state => state.bookReports.image);
    const selectedBook = useSelector(state => state.book.selected);
    const selectedCategory = useSelector(state => state.book.category);

    const [ editMode, setEditMode ] = useState(false);
    const [ searchWord, setSearchWord ] = useState('');
    const [ draftsText, setDraftsText ] = useState('');
    const [ draftsTitle, setDraftsTitle ] = useState('');

    useEffect(() => {
        setDraftsText(text);
        setDraftsTitle(title);
    }, [text, title]);

    useEffect(() => {
        const getBookReport = async () => {
            if (query.has('id')) {
                const reportId = query.get('id');
                dispatch(actions.editModeData(reportId));
                setEditMode(true);

                const bookReport = await api.findOndBookReport(reportId);

                if (imageUrl) {
                    return dispatch(actions.changedImageInEditMode(
                        bookReport.bookReport,
                        imageUrl
                    ));
                }

                if (selectedCategory) {
                    return dispatch(actions.selectedBookInEditMode(
                        bookReport.bookReport,
                        selectedBook,
                        selectedCategory
                    ));
                }
                dispatch(actions.dispatchBookReportData(bookReport.bookReport));
            }
        }
        getBookReport();
    }, []);

    const onSearchButtonClick = useCallback(async () => {
        const searchResult = await bookSearchAPI(userToken, searchWord);

        dispatch(actions.drafts(draftsText, draftsTitle));
        dispatch(actions.receiveSearchResult(searchResult));
        history.push('/writing/book-search');
    }, [searchWord, draftsText, draftsTitle]);

    const onAddImageButtonClick = useCallback(() => {
        history.push('/writing/attaching-image');
        dispatch(actions.drafts(draftsText, draftsTitle));
    }, [draftsText, draftsTitle]);

    const onDoneButtonClick = useCallback(async () => {
        const reportId = query.get('id');

        await api.saveBookReport({
            editMode,
            reportId,
            userToken,
            quote,
            imageUrl,
            draftsText,
            draftsTitle,
            selectedBook,
            selectedCategory
        });
        dispatch(actions.clearDrafts());
        history.push('/');
    }, [editMode, draftsTitle, draftsText]);

    return (
        <>
            <input type='search'
                name='bookSearch'
                onChange={(e) => setSearchWord(e.target.value)}
            />
            <button
                onClick={onSearchButtonClick}
            >Search</button>
            {
                selectedBook
                && <div>
                    <input type='text' placeholder={selectedBook.title} />
                    <input type='text' placeholder={selectedBook.author} />
                    <input type='text' placeholder={selectedCategory} />
                </div>
            }
            <img src={imageUrl} />
            <button
                onClick={onAddImageButtonClick}
            >책 사진 넣기</button>
            <input
                className='title'
                type='text'
                value={draftsTitle}
                onChange={(e) => setDraftsTitle(e.target.value)}
            />
            <textarea
                className='text'
                rows='10'
                cols='50'
                defaultValue={draftsText}
                onChange={(e) => setDraftsText(e.target.value)}
            />
            <input
                className='quote'
                type='text'
                defaultValue={quote}
            />
            <button
                onClick={onDoneButtonClick}
            >Done</button>
        </>
    );
};

export default Writing
