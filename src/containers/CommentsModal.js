import React, { Component } from 'react';

import { getUserData } from '../api/userAPI'
import * as api from '../api/bookAPI';
import './CommentsModal.css';

export default class CommentsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            comment: '',
            bookReport: null,
            defaultChecked: '',
            isBookmarked: false,
            userToken: localStorage.token,
            userName: '',
            isOwner: false
        };
    }

    componentDidMount() { 
        this._getBookReport();
        this._isUserChecked();
    }

    componentDidUpdate() {
        console.log('component did update');
    }

    _bookmark = () => {
        this.setState({ isBookmarked: !this.state.isBookmarked });
    }

    _getBookReport = async () => {
        const bookReport = await api.findOndBookReport(this.props.bookReportId);

        this.setState({
            bookReport: bookReport.bookReport,
            comments: bookReport.comments
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

    render() {
        return (
            <div className='outerContainer'>
                <div className='innerReport'>
                    {
                        this.state.bookReport
                        && <>
                            <input
                                type="checkbox" 
                                onChange={this._bookmark}
                                defaultChecked={this.state.defaultChecked}
                            />
                            <div>{this.state.bookReport.book_info.title}</div>
                            <div>{this.state.bookReport.book_info.author}</div>
                            <div>{this.state.bookReport.book_info.category}</div>
                            <div>{this.state.bookReport.title}</div>
                            <img src={this.state.bookReport.image_url}/>
                            <div>{this.state.bookReport.quote}</div> 
                            <div>{this.state.bookReport.text}</div>
                        </>
                    }
                    <button onClick={this._onClickCloseButton}>Close</button>
                </div>
                <div className='commentsContainer'>
                    <div className='comment'>
                        {
                            this.state.comments
                            && this.state.comments.map((el, index) => {
                                return (
                                    <div key={index}>
                                        {el.text}
                                        {el.author.name}
                                        {el.date}
                                        {
                                            this.state.userName === el.author.name
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

