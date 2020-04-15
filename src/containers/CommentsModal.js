import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUserData } from '../api/userAPI'
import * as api from '../api/bookAPI';
import { deleteBookReport } from '../api/userAPI';
import './CommentsModal.css';

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
            defaultChecked
        } = this.state;

        return (
            <div className='outerContainer'>
                <div className='innerReport'>
                    {
                        bookReport
                        && <>
                            <input
                                type="checkbox"
                                onChange={this._bookmark}
                                defaultChecked={defaultChecked}
                            />
                            {
                                author.name === userName
                                && (
                                    <>
                                        <Link to={`/writing?id=${bookReport._id}`}>
                                            <button>수정하기</button>
                                        </Link>
                                        <input
                                            type='button'
                                            value='게시물 삭제'
                                            onClick={this._onDeleteReportButtonClick}
                                        />
                                    </>
                                )
                            }
                            <div>{bookReport.book_info.title}</div>
                            <div>{bookReport.book_info.author}</div>
                            <div>{bookReport.book_info.category}</div>
                            <div>{bookReport.title}</div>
                            <img src={bookReport.image_url}/>
                            <div>{bookReport.quote}</div>
                            <div>{bookReport.text}</div>
                        </>
                    }
                    <button onClick={this._onCloseButtonClick}>Close</button>
                </div>
                <div className='commentsContainer'>
                    <div className='comment'>
                        {
                            comments
                            && comments.map((el, index) => {
                                return (
                                    <div key={index}>
                                        {el.text}
                                        {el.author.name}
                                        {el.date}
                                        {
                                            userName === el.author.name
                                            && <input
                                                type='button'
                                                value='삭제하기'
                                                name={el._id}
                                                onClick={this._onDeleteButtonClick}
                                            />
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='writeComment'>
                        <textarea
                            onChange={this._writeComment}
                        ></textarea>
                        <button onClick={this._onAddCommentButtonClick}>댓글남기기</button>
                    </div>
                </div>
            </div>
        );
    }
}

