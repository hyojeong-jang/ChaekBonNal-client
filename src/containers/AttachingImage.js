import React from 'react';
import { connect } from 'react-redux';

import { receiveImageData } from '../action/index'
import { saveBookImage } from '../api/bookAPI';
import textDetectionAPI from '../api/textDetectionAPI';

class AttachingImage extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeImageFile = (e) => {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
     
            reader.onload = () => {
                return this.setState({ imageSrc: reader.result });
            }
        };
        this.onClickAddButton = async () => {
            console.log(this.state.imageSrc)
            const userToken = localStorage.token;
            const url = await saveBookImage(this.state.imageSrc, userToken);
            const quote = this.state.detectedText;
    
            await this.props.dispatchImageData(url, quote);
            this.props.history.push("/writing");
        }
        this.startTextDetection = async () => {
            const detectedText = await textDetectionAPI(this.state.imageSrc);
            this.setState({ detectedText });
        }
    }

    state = { imageSrc: '', detectedText: '' };

    hasGetUserMedia () {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia
        );
    }

    render() {
        const { imageSrc } = this.state;

      return (
        <>
            {
                imageSrc
                ? <img src={imageSrc} />
                : []
            }
            <input type='file' onChange={this.onChangeImageFile} accept='image/*;capture=camera' /> 
            <button onClick={this.startTextDetection}>인용구 추출</button>
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
