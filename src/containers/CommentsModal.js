import React, { Component } from 'react';
import { connect } from 'react-redux';

import { receiveBookmark } from '../action/index';
import { getUserData } from '../api/userAPI'
import { findOndBookReport, saveBookmark } from '../api/bookAPI';
import './CommentsModal.css';

export default class CommentsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            bookReport: null,
            defaultChecked: '',
            isBookmarked: false,
            userToken: localStorage.token
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
        const bookReport = await findOndBookReport(this.props.bookReportId);

        this.setState({
            bookReport,
            comments: bookReport.comments
        });
    }

    _isUserChecked = async () => {
        const userData = await getUserData(this.state.userToken);
        const isUserChecked = userData.bookmarks.includes(this.props.bookReportId);

        if (isUserChecked) {
            this.setState({ defaultChecked: 'checked' });
            this.setState({ isBookmarked: true });
        } else {
            this.setState({ defaultChecked: '' });
            this.setState({ isBookmarked: false });
        }
    }

    _onClickCloseButton = async () => {
        await saveBookmark(this.state.userToken, this.props.bookReportId, this.state.isBookmarked); 
        this.props.setModal(false);
    }

    render() {
        console.log(this.state.isBookmarked, this.state.defaultChecked)
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
                            {/* <img src={this.state.bookReport.image_url}/> */}
                            <div>{this.state.bookReport.quote}</div> 
                            <div>{this.state.bookReport.text}</div>
                        </>
                    }
                    <button onClick={this._onClickCloseButton}>Close</button>
                </div>
                <div className='comments'>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchBookmark(bookmarkData) {
            dispatch(receiveBookmark(bookmarkData))
        }
    }
}


connect(mapStateToProps, mapDispatchToProps)(CommentsModal)
