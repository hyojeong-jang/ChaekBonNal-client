import React, { Component } from 'react';
import { connect } from 'react-redux';

import { receiveBookmark } from '../action/index';
import { findOndBookReport } from '../api/bookAPI';
import './CommentsModal.css';

export default class CommentsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bookReport: '',
          comments: [],
          isBookmarked: false
        };
    }

    componentDidMount() { 
        console.log('component did mount');
        this._getBookReport();
        this._getAuthorData();
    }

    componentDidUpdate() {
        console.log('component did update');
        console.log(this.state.isBookmarked)
    }

    async _getBookReport () {
        const bookReport = await findOndBookReport(this.props.bookReportId);

        this.setState({
            bookReport,
            comments: bookReport.comments
        });
    }

    async _getAuthorData() {
        console.log('get author data');
    }

    _bookmark = () => {
        this.setState({ isBookmarked: !this.state.isBookmarked });
    }

    _onClickCloseButton = () => {
        // const isBookmarked = this.state.isBookmarked;
        // const userInfo = localStorage.token;
        // this.props.dispatchBookmark({ isBookmarked, userInfo });

        this.props.setModal(false);
        
    }

    render() {
        return (
            <div className='outerContainer'>
                <div className='innerContainer'>
                    {
                        this.state.bookReport
                        && <>
                            <input
                                type="checkbox" 
                                onChange={this._bookmark}
                            ></input>
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
