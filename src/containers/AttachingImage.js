import React from 'react';
import { connect } from 'react-redux';
import { receiveImageData } from '../action/index'
import { saveBookImage } from '../api/bookAPI';

class AttachingImage extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.onChangeImageFile = (e) => {
            const reader = new FileReader();
            const imgFile = e.target.files[0];
            const fileUrl = reader.readAsDataURL(imgFile);
            
            reader.onload = () => {
                return this.setState({ imgFile: fileUrl, imageUrl: reader.result });
            }
        };
        this.onClickAddButton = async () => {          
            const userToken = localStorage.token;
            const url = await saveBookImage(this.state.imageUrl, userToken);
            const quote = '';
            await this.props.dispatchImageData(url, quote);
            this.props.history.push("/writing");
        }
    }

    state = {
        imgFile: "",
        imageUrl: ""
    };

    hasGetUserMedia () {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia
        );
    }

    render() {
        const { imageUrl } = this.state;

      return (
        <>
            {
                imageUrl
                ? <img src={imageUrl} />
                : []
            }
            <div ref={this.myRef} />
            <input type='file' onChange={this.onChangeImageFile} accept='image/*;capture=camera' /> 
            <button>인용구 추출</button>
            <button onClick={this.onClickAddButton}>첨부하기</button>
        </>
      )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchImageData: (url, quote) => dispatch(receiveImageData(url, quote)),
    }
}

export default connect(null, mapDispatchToProps)(AttachingImage)
