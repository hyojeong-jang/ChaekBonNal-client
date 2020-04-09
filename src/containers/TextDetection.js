import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactCrop, { makeAspectCrop } from 'react-image-crop'

import { receiveDetectedText } from '../action/index'

import textDetectionAPI from '../api/textDetectionAPI';
import 'react-image-crop/dist/ReactCrop.css'


const TextDetection = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const imageSrc = useSelector(state => state.bookReports.image);

    const [ text, setText ] = useState('');
    const [ crop, setCrop ] = useState({
        x: 10,
        y: 10,
        width: 80,
        height: 80
      }
    );

    const onClickDetectionButton = useCallback(async () => {
        const detectedText = await textDetectionAPI(imageSrc);
        setText(detectedText);
    })

    const onClickDoneButton = useCallback(() => {
        dispatch(receiveDetectedText(text));
        history.push('/writing');
    });

    const onCropChange = useCallback(crop => {
        setCrop({ crop });
    });

    const onImageLoaded = useCallback(image => {
        console.log('onCropComplete', image)
    });

    const onCropComplete = useCallback(crop => {
        console.log('onCropComplete', crop)
    });

    return (
        <>
            <ReactCrop
                src={imageSrc}
                crop={crop}
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
            />
            {/* <img src={imageSrc} /> */}
            <button onClick={onClickDetectionButton}>텍스트 감지하기</button>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={onClickDoneButton}>인용문으로 사용</button>
        </>
    );
}

export default TextDetection
