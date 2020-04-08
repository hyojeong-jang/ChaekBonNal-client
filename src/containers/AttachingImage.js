import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { receiveImageData } from '../action/index'
import { saveBookImage } from '../api/bookAPI';


const AttachingImage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ imageSrc, setImageSrc ] = useState('');

    const onChangeImageFile = useCallback((e) => {
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImageSrc(reader.result);
            dispatch(receiveImageData(reader.result, null));
        }
    });

    const onClickAddButton = useCallback(async () => {
        const userToken = localStorage.token;
        const url = imageSrc.split(',')[1];
  
        await saveBookImage(userToken, url);
        dispatch(receiveImageData(url, null));
        history.push('/writing');
    });

    const startTextDetection = useCallback(async () => {
        history.push(`/writing/attaching-image/text-detection`);
    });

    const hasGetUserMedia = () => {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia
        );
    }

    return (
        <>
            {
                imageSrc
                ? <img src={imageSrc} />
                : []
            }
            <input type='file' onChange={onChangeImageFile} accept='image/*;capture=camera' /> 
            <button onClick={startTextDetection}>인용구 추출</button>
            <button onClick={onClickAddButton}>첨부하기</button>
        </>
    );
}

export default AttachingImage
