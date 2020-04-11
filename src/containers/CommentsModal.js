import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUserData } from '../api/userAPI'
import * as api from '../api/bookAPI';
import { deleteBookReport } from '../api/userAPI';
import './CommentsModal.css';
import Writing from './Writing';

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
        this._isUserChecked();
    }

    _bookmark = () => {
        this.setState({ isBookmarked: !this.state.isBookmarked });
    }

    _getBookReport = async () => {
        const bookReport = await api.findOndBookReport(this.props.bookReportId);

        this.setState({
            bookReport: bookReport.bookReport,
            comments: bookReport.comments,
            author: bookReport.author
        });
    }

    _isUserChecked = async () => {
        const userData = await getUserData(this.state.userToken);
        const isUserChecked = userData.bookmarks.includes(this.props.bookReportId);

        this.setState({ userName: userData.name });
    
        if (isUserChecked) {
            this.setState({ defaultChecked: 'checked' });
            this.setState({ isBookmarked: true });
        } else {
            this.setState({ defaultChecked: '' });
            this.setState({ isBookmarked: false });
        }
    }

    _onClickCloseButton = async () => {
        await api.saveBookmark(this.state.userToken, this.props.bookReportId, this.state.isBookmarked);
        this.props.setModal(false);
    }

    _writeComment = async (e) => {
        this.setState({ comment: e.target.value });
    }

    _onClickAddCommentButton = async () => {
        const savedComment = await api.saveComment(this.state.userToken, this.props.bookReportId, this.state.comment);

        this.setState({ comments: savedComment });
    }

    _onClickDeleteButton = async (e) => {
        const withoutDeletedComment = await api.deleteComment(this.state.userToken, this.props.bookReportId, e.target.name);
        this.setState({ comments: withoutDeletedComment })
    }

    _onClickDeleteReport = async () => {
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
                                        <Link to={`/writing/edit?id=${author._id}`}>
                                            <button>수정하기</button>
                                        </Link>
                                        <input
                                            type='button'
                                            value='게시물 삭제'
                                            onClick={this._onClickDeleteReport}
                                        />
                                        // 여기서부터 시작
                                        // 독후감 쓰기 페이지에 스테이트 텍스트 남아있는거 먼저 처리하기
                                        // 경로마다 사용자 인증 로직 넣고 인증 안되어있으면 로그인페이지로 라우팅
                                        // 잔 버그 고치고
                                        // 게시물 수정 어케 할건지 생각해보기
                                        // Writing 재사용 or 새로운 컴포넌트 만들꺼?

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
                    <button onClick={this._onClickCloseButton}>Close</button>
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
                                                onClick={this._onClickDeleteButton}
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
                        <button onClick={this._onClickAddCommentButton}>댓글남기기</button>
                    </div>
                </div>
            </div>
        );
    }
}

