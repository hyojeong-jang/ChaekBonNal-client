import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { receiveDetectedText } from '../action/index'

import textDetectionAPI from '../api/textDetectionAPI';

const TextDetection = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const imageSrc = useSelector(state => state.bookReports.imageUrl);

    const [ text, setText ] = useState('');

    const onClickDetectionButton = useCallback(async () => {
        const detectedText = await textDetectionAPI(imageSrc);
        setText(detectedText);
    })

    const onClickDoneButton = useCallback(() => {
        dispatch(receiveDetectedText(text));
        history.push('/writing');
    });

    return (
        <>
            <img src={imageSrc} />
            <button onClick={onClickDetectionButton}>텍스트 감지하기</button>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={onClickDoneButton}>인용문으로 사용</button>
        </>
    );
}

export default TextDetection
