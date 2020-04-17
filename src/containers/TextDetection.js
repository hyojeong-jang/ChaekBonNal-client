import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactCrop from 'react-image-crop'

import { receiveDetectedText } from '../action/index'

import textDetectionAPI from '../api/textDetectionAPI';
import 'react-image-crop/dist/ReactCrop.css'
import styles from './css/TextDetection.module.css';


const TextDetection = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const dataUrl = useSelector(state => state.bookReports.dataUrl);
  const reportId = useSelector(state => state.bookReports.id);

  const [ text, setText ] = useState('');
  const [ crop, setCrop ] = useState({
    x: 10,
    y: 10,
    width: 80,
    height: 80
  });

  const onClickDetectionButton = useCallback(async () => {
    const detectedText = await textDetectionAPI(dataUrl);
    setText(detectedText);
  })

  const onClickDoneButton = useCallback(() => {
    dispatch(receiveDetectedText(text));

    if (reportId) {
      history.push(`/writing?id=${reportId}`);
    } else {
      history.push('/writing');
    }
  }, [reportId, text]);

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
    <div className={styles.container}>
      <ReactCrop
        src={dataUrl}
        crop={crop}
        className={styles.image}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        onChange={onCropChange}
      />
      <textarea
        value={text}
        maxlength='115'
        className={styles.textarea}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <button
          className={styles.detectButton}
          onClick={onClickDetectionButton}
        >텍스트 감지하기</button>
        <button
          className={styles.useQuote}
          onClick={onClickDoneButton}
        >인용문으로 사용</button>
      </div>
  </div>
);
}

export default TextDetection
