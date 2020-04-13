import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalPortal from '../ModalPortal';
import CommentsModal from '../containers/CommentsModal';

import { getUserLibrary } from '../api/userAPI';

const Library = () => {
    const userToken = localStorage.token;
    const [ isModalOpened, setIsModalOpened ] = useState(false);
    const [ bookReportId, setBookReportId ] = useState('');
    const [ library, setLibrary ] = useState(null);

    useEffect (() => {
        const getlibrary = async () => {
            const bookReports = await getUserLibrary(userToken);
            setLibrary(bookReports);
        }
        getlibrary();
    }, [])

    return (
        <>
            <div>내 서재</div>
            <Link to='/bookmarks'>
                <button>책갈피</button>
            </Link>
            {
                library
                && library.map((el, index) => {
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

export default Library
