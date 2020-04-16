import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as api from '../api/bookAPI';
import { byUserPreference } from '../action/index'

import FlipPage from 'react-flip-page';
import CommentsModal from './CommentsModal';
import ModalPortal from '../ModalPortal';
import Header from '../components/Header';
import styles from './App.module.css';

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
        bookReport = await api.receiveMemberBookReport(userToken);
      } else {
        bookReport = await api.receiveNonMemberBookReport();
      }
      dispatch(byUserPreference(bookReport));
    };
    receiveData();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header/>
      </div>
      {
        bookReports
        && (
          <div className={styles.app}>
            <FlipPage
              className={styles.book}
              showSwipeHint
              uncutPages
              orientation='horizontal'
              width='1000'
              height='700'
              pageBackground='#ffffff'
              animationDuration='400'
            >
              { bookReports.map((page, index) => (
                <article
                  key={index}
                  className={styles.article}
                  onClick={() => {
                    setIsModalOpened(true);
                    setBookReportId(page._id);
                  }}
                >
                  <div className={styles.leftContainer}>
                    <h1>{page.title}</h1>
                    <img src={page.image_url} className={styles.image} />
                    <blockquote>{page.quote}</blockquote>
                    <div className={styles.bookInfo}>
                      <div><img src={page.book_info.image} /></div>
                      <div className={styles.bookDetail}>
                        <span>Title</span>
                        <a href={page.book_info.link}>
                          {page.book_info.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}
                        </a>
                        <span>Author</span>
                        {page.book_info.author.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}
                        <span>Main Category</span>
                        {page.book_info.category}
                        <span>Publisher</span>
                        {page.book_info.publisher}
                      </div>
                    </div>
                  </div>
                  <div className={styles.rightContainer}>
                    <div className={styles.text}>{page.text}</div>
                    <div className={styles.userInfo}>
                      <img className={styles.avartar} src={page.author.imageUrl} />
                      <a className={styles.name}>{page.author.name}</a>
                    </div>
                  </div>
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
    </div>
  );
}

export default App;
