import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { receiveMemberBookReport, receiveNonMemberBookReport } from '../api/bookAPI';
import { byUserPreference } from '../action/index'

import { GoogleLogout } from 'react-google-login';
import FlipPage from 'react-flip-page';

import CommentsModal from './CommentsModal';
import ModalPortal from '../ModalPortal';
import './App.css';


const App = () => {
    const userToken = localStorage.token;
    const dispatch = useDispatch();
    const bookReports = useSelector(state => state.bookReports.list);
    let bookReport = null;

    const [ bookReportId, setBookReportId ] = useState('');
    const [ isModalOpened, setIsModalOpened ] = useState(false);

    useEffect(() => {
        const receiveData = async () => {
            if (userToken) {
                bookReport = await receiveMemberBookReport(userToken);
            } else {
                bookReport = await receiveNonMemberBookReport();
            }
            dispatch(byUserPreference(bookReport));
        };
        receiveData();
    }, [])

    const onLogoutButtonClick = useCallback(() => {
        localStorage.removeItem('token');
        window.location.reload();
    });

    return (
        <>
            <div className='header'>
                <img src='/images/Logo.png' className='logo' />
                {
                    localStorage.token
                    && <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText='Logout'
                        className='logout'
                        onLogoutSuccess={onLogoutButtonClick}
                    />
                }
            </div>
            <Link to='/login'>
                <img src='/images/login.png' className='start' />
            </Link>
            <Link to='/writing'>
                <img src='/images/writing.png' className='btn writing' />
            </Link>
            <Link to='/library'>
                <img src='/images/mypage.png' className='btn mypage' />
            </Link>
            {
                bookReports
                && (
                    <div className='app'>
                        <FlipPage
                            className='book'
                            showSwipeHint
                            uncutPages
                            orientation='horizontal'
                            width='1200'
                            height='800'
                            pageBackground='#ffffff'
                            animationDuration='400'
                            style={{top: '20%'}}
                        >
                        {
                            bookReports.map((page, index) => (
                                <article
                                    key={index}
                                    className='article'
                                    onClick={() => {
                                        setIsModalOpened(true);
                                        setBookReportId(page._id);
                                    }}
                                >
                                    <div>{page.book_info.title}</div>
                                    <img src={page.image_url} />
                                    <div>{page.book_info.author}</div>
                                    <div>{page.book_info.category}</div>
                                    <div>{page.title}</div>
                                    <div>{page.text}</div>
                                    <div>{page.quote}</div>
                                </article>
                            ))
                        }
                        </FlipPage>
                    </div> 
                )
            }
            {
                isModalOpened
                && <ModalPortal>
                    <CommentsModal
                        setModal={setIsModalOpened}
                        bookReportId={bookReportId}
                    />
                </ModalPortal>
            }
        </>
    );
}

export default App;
