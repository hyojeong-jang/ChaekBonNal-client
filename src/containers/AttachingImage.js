import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';

import { receiveImageData, draftsImage } from '../action/index';
import { saveBookImage } from '../api/bookAPI';

const AttachingImage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ imageSrc, setImageSrc ] = useState('');
    const [ imageFile, setImageFile ] = useState(null);

    const userToken = localStorage.token;
    let resultUrl = null;

    const onChangeImageFile = useCallback((e) => {
        setImageFile(e.target.files[0]);
        Resizer.imageFileResizer(
            e.target.files[0],
            300,
            300,
            'JPG',
            100,
            0,
            uri => {
                setImageSrc(uri);
                dispatch(draftsImage(uri));
            },
            'base64'
        );
    });

    const onClickAddButton = useCallback(async () => {
        if (!resultUrl) {
            resultUrl = await saveBookImage(userToken, imageFile);
        }
        setImageSrc(resultUrl);
        dispatch(receiveImageData(resultUrl));
        history.goBack(1);
    });

    const startTextDetection = useCallback(async () => {
        resultUrl = await saveBookImage(userToken, imageFile);
        dispatch(receiveImageData(resultUrl));
        history.push(`/writing/attaching-image/text-detection`);
    });

    return (
        <>
            {
                imageSrc
                && <img src={imageSrc} />
            }

            <input
                type='file'
                name='photo'
                onChange={onChangeImageFile}
                accept='image/*;capture=camera'
            />
            <button onClick={startTextDetection}>인용구 추출</button>
            <button onClick={onClickAddButton}>첨부하기</button>
        </>
    );
}

export default AttachingImage
