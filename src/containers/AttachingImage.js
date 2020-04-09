import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';

import { receiveImageData } from '../action/index'
import { saveBookImage } from '../api/bookAPI';

const AttachingImage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ imageSrc, setImageSrc ] = useState('');
    const [ imageFile, setImageFile ] = useState(null);

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
                dispatch(receiveImageData(uri, null));
            },
            'base64'
        );
    });

    const onClickAddButton = useCallback(async () => {
        const userToken = localStorage.token;
        const resultUrl = await saveBookImage(userToken, imageFile);

        dispatch(receiveImageData(resultUrl, null));
        history.push('/writing');
    });

    const startTextDetection = useCallback(async () => {
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
