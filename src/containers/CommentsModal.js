import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUserData } from '../api/userAPI'
import * as api from '../api/bookAPI';
import { deleteBookReport } from '../api/userAPI';
import styles from './css/CommentsModal.module.css';

export default class CommentsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: null,
      comments: null,
      bookReport: null,
      comment: '',
      userName: '',
      defaultChecked: '',
      isBookmarked: false,
      userToken: localStorage.token,
    };
  }

  componentDidMount() {
    this._getBookReport();
    this._userBookmarked();
  }

  _bookmark = (e) => {
    if (this.state.userToken) {
      this.setState({ isBookmarked: !this.state.isBookmarked });
    } else {
      e.target.checked = false;
      alert('로그인하시면 북마크할 수 있어요!');
    }
  }

  _getBookReport = async () => {
    const bookReport = await api.findOndBookReport(this.props.bookReportId);

    this.setState({
      bookReport: bookReport.bookReport,
      comments: bookReport.comments,
      author: bookReport.author
    });
  }

  _userBookmarked = async () => {
    if (this.state.userToken) {
      const userData = await getUserData(this.state.userToken);
      const isUserBookmarked = userData.bookmarks.includes(this.props.bookReportId);

      this.setState({ userName: userData.name });

      if (isUserBookmarked) {
        this.setState({ defaultChecked: 'checked' });
        this.setState({ isBookmarked: true });
      } else {
        this.setState({ defaultChecked: '' });
        this.setState({ isBookmarked: false });
      }
    }
  }

  _onCloseButtonClick = async () => {
    if (this.state.userToken) {
      await api.saveBookmark(this.state.userToken, this.props.bookReportId, this.state.isBookmarked);
    }
    this.props.setModal(false);
  }

  _writeComment = async (e) => {
    this.setState({ comment: e.target.value });
  }

  _onAddCommentButtonClick = async () => {
    if (this.state.userToken) {
      const savedComment = await api.saveComment(this.state.userToken, this.props.bookReportId, this.state.comment);

      this.setState({ comments: savedComment });
    } else {
      alert('로그인하시면 댓글을 남길 수 있어요!');
    }
  }

  _onDeleteButtonClick = async (e) => {
    const withoutDeletedComment = await api.deleteComment(this.state.userToken, this.props.bookReportId, e.target.name);
    this.setState({ comments: withoutDeletedComment })
  }

  _onDeleteReportButtonClick = async () => {
    await deleteBookReport(this.state.userToken, this.props.bookReportId);
    window.location.reload();
  }

  render() {
    const {
      author,
      userName,
      comments,
      bookReport,
      defaultChecked,
    } = this.state;

    return (
      <div className={styles.outerContainer}>
        <div className={styles.innerReport}>
          {
            bookReport
            && <>
              <input
                className={styles.bookmarksBox}
                type='checkbox'
                onChange={this._bookmark}
                defaultChecked={defaultChecked}
              />
              { author.name === userName
                && <>
                  <Link to={`/writing?id=${bookReport._id}`}>
                    <button className={styles.editButton}>Edit</button>
                  </Link>
                  <input
                    type='button'
                    value='Delete'
                    className={styles.deleteButton}
                    onClick={this._onDeleteReportButtonClick}
                  />
                </>
              }
              <div className={styles.bookInfo}>
                {bookReport.book_info.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}&ensp;-&ensp;
                {bookReport.book_info.author.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}
              </div>
              <div className={styles.title}>{bookReport.title}</div>
              <div className={styles.imageContainer}>
                <img className={styles.image} src={bookReport.image_url}/>
                <p>
                  <img className={styles.icon} src='/images/quoteIcon.png' />
                  {bookReport.quote}
                </p>
              </div>
              <div className={styles.text}>
                {bookReport.text}
              </div>
            </>
          }
        </div>
        <div className={styles.commentsContainer}>
          {
            author
            && <div className={styles.author}>
              <img src={author.imageUrl} />
              <div className={styles.authorName}>{author.name}</div>
            </div>
          }
          <div className={styles.comment}>
            {
              comments
              && comments.map((el, index) => {
                return (
                  <div key={index} className={styles.commentDetail}>
                    <div className={styles.oneComment}>
                      {el.text}&ensp;&ensp;
                      {
                        userName === el.author.name
                        && <input
                          type='button'
                          value='X'
                          name={el._id}
                          className={styles.commentDeleteButton}
                          onClick={this._onDeleteButtonClick}
                        />
                      }
                    </div>
                    <span>{el.author.name}&ensp;&ensp;</span>
                    <span>{new Date(el.date).toISOString().substring(0, 10)}</span>
                  </div>
                );
              })
            }
            <button
              className={styles.closeButton}
              onClick={this._onCloseButtonClick}
            >X</button>
          </div>
          <div className={styles.writeComment}>
            <textarea className={styles.commentInput} onChange={this._writeComment}></textarea>
            <button onClick={this._onAddCommentButtonClick}>게시</button>
          </div>
        </div>
      </div>
    );
  }
}

