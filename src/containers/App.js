import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { receiveMemberBookReport, receiveNonMemberBookReport } from '../api/bookAPI';
import { byUserPreference } from '../action/index'
import BookReport from '../components/BookReport';
import { GoogleLogout } from 'react-google-login';

import './App.css';


const App = () => {
    const userToken = localStorage.token;
    const dispatch = useDispatch();
    const history = useHistory();
    const bookReports = useSelector(state => state.bookReports.list);
    let bookReport = null;

    useEffect(() => {
        const receiveData = async () => {
            if (userToken) {
                bookReport = await receiveMemberBookReport(userToken);
                dispatch(byUserPreference(bookReport));
            } else {
                bookReport = await receiveNonMemberBookReport();
                dispatch(byUserPreference(bookReport));
            }
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
                <img src='/images/ChaekBonNalLogo.png' className='logo' />
                <Link to='/login'>
                    <button className='startBtn'>시작하기</button>
                </Link>
                <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={onLogoutButtonClick}
                />
            </div>
            <Link to='/writing'>
                <button>글 쓰기</button>
            </Link>
            <Link to='/library'>
                <button>내 방</button>
            </Link>
            <div>
                {
                    bookReports
                    ? <BookReport data={bookReports} />
                    : []
                }
            </div>
        </>
    );
}

export default App;
