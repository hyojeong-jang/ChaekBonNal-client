import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalPortal from '../ModalPortal';
import CommentsModal from '../containers/CommentsModal';

import { getUserBookmarks } from '../api/userAPI';

const Bookmarks = () => {
    const userToken = localStorage.token;
    const [ isModalOpened, setIsModalOpened ] = useState(false);
    const [ bookReportId, setBookReportId ] = useState('');
    const [ bookmarks, setBookmarks ] = useState(null);

    useEffect (() => {
        const getbookmarks = async () => {
            const bookReports = await getUserBookmarks(userToken);
            setBookmarks(bookReports);
        }
        getbookmarks();
        return () => {    
        }
    }, [])

    return (
        <>
            <div>책갈피</div>
            <Link to='/'>
                    <button>홈</button>
            </Link>
            {
                bookmarks
                && bookmarks.map((el, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                setIsModalOpened(true);
                                setBookReportId(el._id);
                            }}
                        >
                            <div>{el.book_info.title}</div>
                            <div>{el.book_info.author}</div>
                            <div>{el.title}</div>
                            <div>{el.text}</div>
                        </div>
                    );
                })
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

export default Bookmarks